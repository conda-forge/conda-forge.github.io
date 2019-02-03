import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode exposing (Decoder, field, string)



-- MAIN


main =
  Browser.element
    { init = init
    , update = update
    , subscriptions = subscriptions
    , view = view
    }



-- MODEL

type Model
  = Failure
  | Loading
  | Success String
  | Query String

init : () -> (Model, Cmd Msg)
init _ =
  (Query "", getNone)



-- UPDATE

type Msg
  = SendSearch
  | GotSearch (Result Http.Error String)
  | GotQuery String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    SendSearch ->
      (model, Cmd.none)

    GotSearch result ->
      case result of
        Ok url ->
          (Success url, Cmd.none)

        Err _ ->
          (Failure, Cmd.none)

    GotQuery q ->
      (model, Cmd.none)



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none



-- VIEW


view : Model -> Html Msg
view model =
  div []
    [ viewInput "text" "Search" GotQuery
    , viewResults model
    ]

viewInput : String -> String -> (String -> msg) -> Html msg
viewInput t p toMsg =
  input [ type_ t, placeholder p, onInput toMsg ] []

viewResults : Model -> Html msg
viewResults model =
  case model of
    Query q ->
        if q == "" then
            div [] []
        else
            h2 [] [ text "Search Results" ]
    Failure ->
        div [] []

    Loading ->
        div [] []

    Success _ ->
        div [] []



-- HTTP


getNone : Cmd Msg
getNone =
    Cmd.none

--getRandomCatGif : Cmd Msg
--getRandomCatGif =
--  Http.get
--    { url = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cat"
--    , expect = Http.expectJson GotGif gifDecoder
--    }


--gifDecoder : Decoder String
--gifDecoder =
--  field "data" (field "image_url" string)
