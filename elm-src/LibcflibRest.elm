-- A collection of libcflib REST types and their JSON decoders
module LibcflibRest exposing (..)

import List
import Dict
import String
import Json.Decode
import Json.Decode as Decode
import Json.Encode as Encode
import Json.Decode exposing (Decoder, map2, map3, map4, map5, field, list, dict, string, int)


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
    }

artifactDecoder : Decoder Artifact
artifactDecoder =
    map3 Artifact
        (field "name" string)
        (field "version" string)
        (field "spec" artifactSpecDecoder)


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
