module Main exposing (..)
import List
import Dict
import String
import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode
import Json.Decode as Decode
import Json.Encode as Encode
import Json.Decode exposing (Decoder, map2, field, list, dict, string, int)


type alias Model =
    { errors : List Error
    , query : String
    , response : Maybe SearchResult
    }


initialModel : Model
initialModel =
    { errors = []
    , query = ""
    , response = Nothing
    }


type alias Error =
    ( FormField, String )


type Msg
    = NoOp
    | SubmitForm
    | SetField FormField String
    | Response (Result Http.Error SearchResult)


type FormField
    = Query



-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case Debug.log "msg" msg of
        NoOp ->
            ( model, Cmd.none )

        SubmitForm ->
            if List.length model.errors == 0 then
                ( { model | errors = [], response = Nothing }
                --, Http.request Response (postRequest model)
                , getQuery model.query
                --, Cmd.none
                )
            else
                ( { model | errors = model.errors }
                , Cmd.none
                )

        SetField field value ->
            ( setField field value model, Cmd.none )

        Response (Ok response) ->
            ( { model | response = Just response }, Cmd.none )

        Response (Err error) ->
            --( { model | response = Just (error ++ " - See the Console for more details.") }, Cmd.none )
            ( { model | response = Just (SearchResult "Some errors" 0) }, Cmd.none )



-- HTTP

getQuery : String -> Cmd Msg
getQuery query =
  Http.get
    { url = "http://localhost:8888/search?query=" ++ query
    , expect = Http.expectJson Response searchQueryDecoder
    }


type alias SearchResult =
    { query : String
    , page_num : Int
    }


searchQueryDecoder: Decoder SearchResult
searchQueryDecoder =
    map2 SearchResult
        (field "query" string)
        (field "page_num" int)
  -- field "results" (list (dict (field "name" string)))

-- HELPERS


setField : FormField -> String -> Model -> Model
setField field value model =
    case field of
        Query ->
            { model | query = value }




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


viewResponse : SearchResult -> Html msg
viewResponse response =
    div [ class "response-container" ]
        [ h2 [] [ text "Response" ]
        , textarea []
            [ text response.query ]
        , div []
            [ text (String.fromInt response.page_num) ]
        ]


viewUtils :
    { a | response : Maybe SearchResult }
    -> ({ a | response : Maybe SearchResult } -> Html msg)
    -> Html msg
viewUtils model viewF =
    div []
        [ viewHeader
        , viewF model
        , case model.response of
            Just response ->
                viewResponse response

            Nothing ->
                text ""
        , viewFooter
        ]


viewU :
    { a | response : Maybe SearchResult }
    -> ({ a | response : Maybe SearchResult } -> Html msg)
    -> Html msg
viewU =
    viewUtils


viewHeader : Html msg
viewHeader =
    div [ class "header" ]
        [ h1 [] [ text ("Conda-Forge") ]
        ]

viewFooter : Html msg
viewFooter =
    div [ class "footer" ]
        [ a [ href "https://github.com/lucamug/elm-form-examples" ]
            [ text "[ code ] " ]
        , a [ href "https://medium.com/@l.mugnaini/forms-in-elm-validation-tutorial-and-examples-2339830055da" ] [ text " [ article ]" ]
        ]

view : Model -> Html Msg
view model =
    viewU model viewForm


viewForm : Model -> Html Msg
viewForm model =
    Html.div
        [ class "form-container"
        , onEnter SubmitForm
        ]
        [ label []
            [ text "Search"
            , input
                [ type_ "text"
                , placeholder "Query"
                , onInput <| SetField Query
                , value model.query
                ]
                []
            , viewFormErrors Query model.errors
            ]
        , button
            [ onClick SubmitForm
            , classList
                [ ( "disabled", not <| List.isEmpty model.errors ) ]
            ]
            [ text "Submit" ]
        ]


viewFormErrors : FormField -> List Error -> Html msg
viewFormErrors field errors =
    errors
        |> List.filter (\( fieldError, _ ) -> fieldError == field)
        |> List.map (\( _, error ) -> li [] [ text error ])
        |> ul [ class "formErrors" ]



-- MAIN

main : Program Decode.Value Model Msg
main =
  Browser.element
        { init = \_ -> ( initialModel, Cmd.none )
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }
