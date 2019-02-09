-- A collection of libcflib REST types and their JSON decoders
module LibcflibRest exposing (..)

import List
import Dict
import String
import Json.Decode
import Json.Decode as Decode
import Json.Encode as Encode
import Json.Decode exposing (Decoder,
    map, map2, map3, map4, map5,
    field, maybe, list, dict,
    string, int, Value, value)


-- Types & Decoders

type alias SearchResult =
    { query : String
    , page_num : Int
    , page_size : Int
    , results : List Artifact
    }

searchResultDecoder: Decoder SearchResult
searchResultDecoder =
    map4 SearchResult
        (field "query" string)
        (field "page_num" int)
        (field "page_size" int)
        (field "results" (list artifactDecoder))


type alias Artifact =
    { name : String
    , version : String
    , spec : ArtifactSpec
    -- The following we normally don't need to decode
    , about : Value
    , rendered_recipe : Value
    }

artifactDecoder : Decoder Artifact
artifactDecoder =
    map5 Artifact
        (field "name" string)
        (field "version" string)
        (field "spec" artifactSpecDecoder)
        (field "about" value)
        (field "rendered_recipe" value)

type alias ArtifactSpec =
    { path : String
    , pkg : String
    , channel : String
    , arch : String
    , name : String
    }

artifactSpecDecoder : Decoder ArtifactSpec
artifactSpecDecoder =
    map5 ArtifactSpec
        (field "path" string)
        (field "pkg" string)
        (field "channel" string)
        (field "arch" string)
        (field "name" string)


type alias ArtifactAbout =
    { license : String
    , home : String
    , summary : String
    , description : Maybe String
    }

artifactAboutDecoder : Decoder ArtifactAbout
artifactAboutDecoder =
    map4 ArtifactAbout
        (field "license" string)
        (field "home" string)
        (field "summary" string)
        (maybe (field "description" string))

type alias ArtifactRenderedRecipe =
    { requirements : Dict.Dict String (List String)
    }

artifactRenderedRecipeDecoder : Decoder ArtifactRenderedRecipe
artifactRenderedRecipeDecoder =
    map ArtifactRenderedRecipe
        (field "requirements" (dict (list string)) )
