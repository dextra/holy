#!/bin/bash

TAG="holy-$1"

git tag -a "$TAG" -m "releasing $TAG"
git push --tags

