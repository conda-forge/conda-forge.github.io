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


type alias Model =
  { query : String
  }


init : Model
init =
  Model ""



-- UPDATE


type Msg
  = Query String


update : Msg -> Model -> Model
update msg model =
  case msg of
    Query query ->
      { model | query = query }



-- SUBSCRIPTIONS


--subscriptions : Model -> Sub Msg
--subscriptions model =
--  Sub.none



-- VIEW


view : Model -> Html Msg
view model =
  div []
    [ viewInput "text" "Search" model.query Query
    , viewResults model
    ]


viewResults : Model -> Html msg
viewResults model =
  if model.query == "" then
  else
    h2 [] [ text "Search Results" ]



-- HTTP


--getRandomCatGif : Cmd Msg
--getRandomCatGif =
--  Http.get
--    { url = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cat"
--    , expect = Http.expectJson GotGif gifDecoder
--    }


--gifDecoder : Decoder String
--gifDecoder =
--  field "data" (field "image_url" string)
