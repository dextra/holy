#!/bin/bash

TAG="$1"

git tag -d "$TAG"
git push origin ":refs/tags/$TAG"
