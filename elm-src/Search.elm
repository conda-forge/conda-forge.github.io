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

import LibcflibRest exposing (SearchResult, searchResultDecoder, Artifact)


-- Types

type alias Model =
    { error : Maybe Http.Error
    , query : String
    , page_num : Int
    , response : Maybe SearchResult
    }


initialModel : Model
initialModel =
    { error = Nothing
    , query = ""
    , page_num = 1
    , response = Nothing
    }


type Msg
    = NoOp
    | SubmitForm
    | UpdatePageNum Int
    | SetField FormField String
    | Response (Result Http.Error SearchResult)


type FormField
    = Query


-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        SubmitForm ->
            ( { model | error = Nothing, response = Nothing }
            , getQuery model.query model.page_num
            )

        UpdatePageNum value ->
            ( { model | page_num = value, error = Nothing, response = Nothing }
            , getQuery model.query value
            )

        SetField field value ->
            ( setField field value model, Cmd.none )

        Response (Ok response) ->
            ( { model | error = Nothing, response = Just response }, Cmd.none )

        Response (Err error) ->
            ( { model | error = Just error, response = Nothing }, Cmd.none )



-- HTTP

getQuery : String -> Int -> Cmd Msg
getQuery query page_num =
  Http.get
    { url = "https://libcflib.conda-forge.org/search?query=" ++ query ++ "&page_num=" ++ (String.fromInt page_num)
    , expect = Http.expectJson Response searchResultDecoder
    }


-- HELPERS


setField : FormField -> String -> Model -> Model
setField field value model =
    case field of
        Query ->
            { model | query = value, page_num = 1 }



onEnter : msg -> Attribute msg
onEnter msg =
    keyCode
        |> Decode.andThen
            (\key ->
                if key == 13 then
                    Decode.succeed msg
                else
                    Decode.fail "Not enter"
            )
        |> on "keyup"



-- VIEWS

viewArtifact : Artifact -> Html Msg
viewArtifact artifact =
    li []
        [ b [] [
          a [ href ("/artifact.html?pkg=" ++ artifact.spec.pkg ++
                    "&channel=" ++ artifact.spec.channel ++
                    "&arch=" ++ artifact.spec.arch ++
                    "&name=" ++ artifact.spec.name) ]
            [ text (artifact.name ++ " v" ++ artifact.version) ]
        ]
        , br [] []
        , text ("artifact: ")
        , i [] [text (artifact.spec.path)]
        ]


viewPageBarLink : Int -> Html Msg
viewPageBarLink page_num =
    button
        [ onClick (UpdatePageNum page_num) ]
        [ text (String.fromInt page_num) ]


viewPageBar : Int -> Html Msg
viewPageBar page_num =
    div [ class "page-bar"] (List.concat
        [ if page_num == 1 then
            [ text "" ]
          else
            List.range (Basics.max (page_num - 5) 1) (page_num - 1)
                |> List.map viewPageBarLink
        , [ text (String.fromInt page_num) ]
        , List.range (page_num + 1) (Basics.max (page_num + 5) 10)
                |> List.map viewPageBarLink
        ])



viewResponse : SearchResult -> Html Msg
viewResponse response =
    div [ class "response-container" ]
        [ h2 [] [ text "Results" ]
        , div []
            [ text ("searched: '" ++ response.query ++ "'") ]
        , viewPageBar response.page_num
        , ol [start ((response.page_num - 1) * response.page_size + 1)]
            ((List.map viewArtifact) response.results)
        , viewPageBar response.page_num
        ]


viewError : Http.Error -> Html Msg
viewError error =
    div [ class "error-container" ]
        [ h2 [] [ text "Search Errors" ]
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
    { a | error : Maybe Http.Error, response : Maybe SearchResult }
    -> ({ a | error : Maybe Http.Error, response : Maybe SearchResult } -> Html Msg)
    -> Html Msg
viewUtils model viewF =
    div []
        [ viewHeader
        , viewF model
        , case model.response of
            Just response ->
                viewResponse response

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
        , a [ href "https://numfocus.salsalabs.org/donate-to-conda-forge/index.html" ]
            [ text "[ donate ] " ]
        ]

view : Model -> Html Msg
view model =
    viewUtils model viewForm


viewForm : Model -> Html Msg
viewForm model =
    Html.div
        [ class "form-container"
        , onEnter SubmitForm
        ]
        [ label []
            [ text "Search: "
            , input
                [ type_ "text"
                , placeholder "Query"
                , onInput <| SetField Query
                , value model.query
                ]
                []
            ]
        , button
            [ onClick SubmitForm ]
            [ text "Submit" ]
        ]


-- MAIN

main : Program Decode.Value Model Msg
main =
  Browser.element
        { init = \_ -> ( initialModel, Cmd.none )
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }
