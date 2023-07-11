#!/bin/bash

set -e

PROJECT_FOLDER=`pwd`
rm -rf "$PROJECT_FOLDER"/tmp/
mkdir -p "$PROJECT_FOLDER/tmp"
cd "$PROJECT_FOLDER/tmp" || exit

openapi-generator-cli generate \
    -i "$PROJECT_FOLDER/openapi.yaml" -g typescript-axios \
    -o "$PROJECT_FOLDER/tmp" \
    --global-property=apiTests=false,modelTests=false

mkdir -p "$PROJECT_FOLDER/src/api"
rm -f "$PROJECT_FOLDER/src/api/api.ts"
mv "$PROJECT_FOLDER"/tmp/api.ts "$PROJECT_FOLDER/src/api"

rm -rf "$PROJECT_FOLDER"/tmp/
