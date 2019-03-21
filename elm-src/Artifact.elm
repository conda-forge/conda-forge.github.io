import List
import Dict
import String
import Basics
import Browser
import Browser.Navigation as Nav
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode
import Json.Decode as Decode
import Json.Encode as Encode
import Url
import Url.Parser exposing (Parser, parse, query, (</>), (<?>), s, oneOf, map)
import Url.Parser.Query exposing (map4, string)
import Url.Parser.Query as Query

import LibcflibRest exposing
    ( Artifact, artifactDecoder
    , ArtifactAbout, artifactAboutDecoder
    , ArtifactRenderedRecipe, artifactRenderedRecipeDecoder
    )


-- Types

type alias Model =
    { error : Maybe Http.Error
    , url : Url.Url
    , key : Nav.Key
    , route : Route
    , response : Maybe Artifact
    }


initialModel : Url.Url -> Nav.Key -> Model
initialModel url key =
    Model
        Nothing
        url
        key
        (parseUrlQuery url)
        Nothing


type Route
    = NotFound
    | ParsedRoute UrlQuery

router : Parser (Route -> a) a
router =
  oneOf
    [ map ParsedRoute (s "artifact.html" <?> queryParserUrlQuery)
    ]

type alias UrlQuery =
    { pkg : Maybe String
    , channel : Maybe String
    , arch : Maybe String
    , name : Maybe String
    }



queryParserUrlQuery =
    (map4 UrlQuery
        (string "pkg")
        (string "channel")
        (string "arch")
        (string "name")
    )


parseUrlQuery : Url.Url -> Route
parseUrlQuery url =
    Maybe.withDefault NotFound (parse router url)

type Msg
    = NoOp
    | LinkClicked Browser.UrlRequest
    | UrlChanged Url.Url
    | Response (Result Http.Error Artifact)



-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        LinkClicked urlRequest ->
            case urlRequest of
                Browser.Internal url ->
                    ( model, Nav.pushUrl model.key (Url.toString url) )

                Browser.External href ->
                    ( model, Nav.load href )

        UrlChanged url ->
            ( { model | url = url, route = (parseUrlQuery url) },
              artifactFromRoute (parseUrlQuery url)
            )

        Response (Ok response) ->
            ( { model | error = Nothing, response = Just response }, Cmd.none )

        Response (Err error) ->
            ( { model | error = Just error, response = Nothing }, Cmd.none )



-- HTTP

getArtifact : String -> String -> String -> String -> Cmd Msg
getArtifact pkg channel arch name =
  Http.get
    { url = "https://libcflib.conda-forge.org/artifact?pkg=" ++ pkg ++ "&channel=" ++ channel ++ "&arch=" ++ arch ++ "&name=" ++ name
    , expect = Http.expectJson Response artifactDecoder
    }


artifactFromUrlQuery : UrlQuery -> Cmd Msg
artifactFromUrlQuery urlquery =
    getArtifact (Maybe.withDefault "" urlquery.pkg)
                (Maybe.withDefault "" urlquery.channel)
                (Maybe.withDefault "" urlquery.arch)
                (Maybe.withDefault "" urlquery.name)

artifactFromRoute : Route -> Cmd Msg
artifactFromRoute route =
    case route of
        NotFound -> Cmd.none
        ParsedRoute urlquery -> artifactFromUrlQuery urlquery


-- VIEWS

viewUrlQuery : Route -> Html Msg
viewUrlQuery r =
    case r of
        NotFound ->
            div [ class "url-query-text-error" ]
                [h4 [] [text "URL query not parsed!"]]
        ParsedRoute urlquery ->
            div [ class "url-query-text" ]
            [ h4 [] [ text (
                (Maybe.withDefault "<no-pkg>" urlquery.pkg) ++ "/" ++
                (Maybe.withDefault "<no-channel" urlquery.channel) ++ "/" ++
                (Maybe.withDefault "<no-arch>" urlquery.arch) ++ "/" ++
                (Maybe.withDefault "<no-name>" urlquery.name) )]
            ]

viewDecoded : (Decode.Decoder valType) -> Decode.Value -> (valType -> Html Msg) -> Html Msg
viewDecoded decoder val htmlMaker =
   case (Decode.decodeValue decoder val) of
        Ok v ->
            htmlMaker v

        Err error ->
            text (Decode.errorToString error)

viewArtifact : Artifact -> Html Msg
viewArtifact artifact =
    div []
        [ b [] [text (artifact.name ++ " v" ++ artifact.version)]
        , br [] []
        , viewDecoded artifactAboutDecoder artifact.about (\about -> div [ class "about" ]
            [ text about.summary
            , br [] []
            , a [ href about.home ] [text "[website]"]
            , text (" - " ++ about.license)
            , case about.description of
                Just desc -> p [] [text desc]
                Nothing -> text ""
            ])
        , br [] []
        , br [] []
        , viewDecoded artifactRenderedRecipeDecoder artifact.rendered_recipe (\rr -> div [ class "rendered-recipe" ]
            [ b [] [ text "Requirements" ]
            , case Dict.get "build" rr.requirements of
                Just val ->
                    div [ class "build-requirements"]
                    [ u [] [text "build:"]
                    , ul [] (List.map (\v -> li [] [text v]) val)
                    ]
                Nothing ->
                    text ""
            , case Dict.get "host" rr.requirements of
                Just val ->
                    div [ class "host-requirements"]
                    [ u [] [text "host:"]
                    , ul [] (List.map (\v -> li [] [text v]) val)
                    ]
                Nothing ->
                    text ""
            , case Dict.get "run" rr.requirements of
                Just val ->
                    div [ class "run-requirements"]
                    [ u [] [text "run:"]
                    , ul [] (List.map (\v -> li [] [text v]) val)
                    ]
                Nothing ->
                    text ""
            ])
        ]


viewError : Http.Error -> Html Msg
viewError error =
    div [ class "error-container" ]
        [ h2 [] [ text "Artifact Errors" ]
        , div [] (case error of
            Http.BadUrl url ->
                [ text ("Bad URL: " ++ url)]
            Http.Timeout ->
                [ text "Network timeout" ]
            Http.NetworkError ->
                [ text "Network error" ]
            Http.BadStatus code ->
                [ text ("Bad status: " ++ String.fromInt code) ]
            Http.BadBody body ->
                [ text body ]
        )
        ]


viewBody :
    { a | error : Maybe Http.Error,
          response : Maybe Artifact,
          route : Route,
          url : Url.Url}
    -> Html Msg
viewBody model =
    div []
        [ viewHeader
        , viewUrlQuery model.route
        , case model.response of
            Just response ->
                viewArtifact response

            Nothing ->
                text "failed"
        , case model.error of
            Just error ->
                viewError error

            Nothing ->
                text ""
        , viewFooter
        ]


viewHeader : Html msg
viewHeader =
    div [ class "header" ]
        [ h1 [] [ text ("Conda-Forge") ]
        ]

viewFooter : Html msg
viewFooter =
    div [ class "footer" ]
        [ a [ href "https://conda-forge.org/" ]
            [ text "[ homepage ] " ]
        , a [ href "https://conda-forge.org/docs/" ]
            [ text "[ docs ] " ]
        , a [ href "https://twitter.com/condaforge" ]
            [ text " [ twitter ]" ]
        , a [ href "https://numfocus.salsalabs.org/donate-to-conda-forge/index.html" ]
            [ text "[ donate ] " ]
        ]

view : Model -> Browser.Document Msg
view model =
    Browser.Document
        "Conda-Forge Artifact"  -- title
        [viewBody model]        -- body


-- MAIN

init : Decode.Value -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url key =
    update (UrlChanged url) (initialModel url key)


main : Program Decode.Value Model Msg
main =
  Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        , onUrlChange = UrlChanged
        , onUrlRequest = LinkClicked
        }
