module Main exposing (..)
import List
import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode
import Json.Decode as Decode
import Json.Encode as Encode


exampleVersion : String
exampleVersion =
    "7"


viewHeader : String -> Html msg
viewHeader version =
    div [ class "header" ]
        [ h1 [] [ text ("Elm Forms - Example " ++ version) ]
        ]


viewFooter : String -> Html msg
viewFooter version =
    div [ class "footer" ]
        [ a [ href "https://github.com/lucamug/elm-form-examples" ]
            [ text "[ code ] " ]
        , a [ href "https://medium.com/@l.mugnaini/forms-in-elm-validation-tutorial-and-examples-2339830055da" ] [ text " [ article ]" ]
        ]



viewResponse : String -> Html msg
viewResponse response =
    div [ class "response-container" ]
        [ h2 [] [ text "Response" ]
        , textarea []
            [ text response ]
        ]


viewUtils :
    { a | response : Maybe String }
    -> String
    -> ({ a | response : Maybe String } -> Html msg)
    -> Html msg
viewUtils model exampleVer viewF =
    div []
        [ viewHeader exampleVer
        , viewF model
        , case model.response of
            Just response ->
                viewResponse response

            Nothing ->
                text ""
        , viewFooter exampleVer
        ]


viewU :
    { a | response : Maybe String }
    -> String
    -> ({ a | response : Maybe String } -> Html msg)
    -> Html msg
viewU =
    viewUtils

type alias Model =
    { errors : List Error
    , email : String
    , password : String
    , response : Maybe String
    }


initialModel : Model
initialModel =
    { errors = []
    , email = ""
    , password = ""
    , response = Nothing
    }


type alias Error =
    ( FormField, String )


type Msg
    = NoOp
    | SubmitForm
    | SetField FormField String
    | Response (Result Http.Error String)


type FormField
    = Email
    | Password



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
                , Cmd.none
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
            ( { model | response = Just ("Some errors") }, Cmd.none )



-- HELPERS


setField : FormField -> String -> Model -> Model
setField field value model =
    case field of
        Email ->
            { model | email = value }

        Password ->
            { model | password = value }




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


view : Model -> Html Msg
view model =
    viewU model exampleVersion viewForm


viewForm : Model -> Html Msg
viewForm model =
    Html.div
        [ class "form-container"
        , onEnter SubmitForm
        ]
        [ label []
            [ text "Email"
            , input
                [ type_ "text"
                , placeholder "Email"
                , onInput <| SetField Email
                , value model.email
                ]
                []
            , viewFormErrors Email model.errors
            ]
        , label []
            [ text "Password"
            , input
                [ type_ "password"
                , placeholder "Password"
                , onInput <| SetField Password
                , value model.password
                ]
                []
            , viewFormErrors Password model.errors
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
