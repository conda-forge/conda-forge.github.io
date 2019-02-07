import List
import Dict
import String
import Basics
import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode
import Json.Decode as Decode
import Json.Encode as Encode
import Url.Parser exposing ((</>), (<?>), s)
import Url.Parser.Query exposing (Parser, map4, string)
import Url.Parser.Query as Query

import LibcflibRest exposing (Artifact, artifactDecoder)


-- Types

type alias Model =
    { error : Maybe Http.Error
    , response : Maybe Artifact
    }


initialModel : Model
initialModel =
    getArtifact (parseUrlQuery s)


type alias UrlQuery =
    { pkg : Maybe String
    , channel : Maybe String
    , arch : Maybe String
    , name : Maybe String
    }

parseUrlQuery : Parser UrlQuery
parseUrlQuery =
    map4 UrlQuery
        (string "pkg")
        (string "channel")
        (string "arch")
        (string "name")

type Msg
    = NoOp
    | Response (Result Http.Error Artifact)



-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        Response (Ok response) ->
            ( { model | error = Nothing, response = Just response }, Cmd.none )

        Response (Err error) ->
            ( { model | error = Just error, response = Nothing }, Cmd.none )



-- HTTP

getArtifact : String -> String -> String -> String -> Cmd Msg
getArtifact pkg channel arch name =
  Http.get
    --{ url = "http://35.192.108.152/search?query=" ++ query ++ "&page_num=" ++ (String.fromInt page_num)
    { url = "http://localhost:8888/artifact?pkg=" ++ pkg ++ "&channel=" ++ channel ++ "&arch=" ++ arch ++ "&name=" ++ name
    , expect = Http.expectJson Response artifactDecoder
    }


-- VIEWS

viewArtifact : Artifact -> Html Msg
viewArtifact artifact =
    li []
        [ b [] [text (artifact.name ++ " v" ++ artifact.version)]
        , br [] []
        , text ("artifact: ")
        , i [] [text (artifact.spec.path)]
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


viewUtils :
    { a | error : Maybe Http.Error, response : Maybe Artifact }
    -> Html Msg
viewUtils model =
    div []
        [ viewHeader
        , case model.response of
            Just response ->
                viewArtifact response

            Nothing ->
                text ""
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
        , a [ href "https://www.flipcause.com/secure/cause_pdetails/NDA0OTk=" ]
            [ text "[ donate ] " ]
        ]

view : Model -> Html Msg
view model =
    viewUtils model


-- MAIN

main : Program Decode.Value Model Msg
main =
  Browser.element
        { init = \_ -> (initialModel, Cmd.none)
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }
