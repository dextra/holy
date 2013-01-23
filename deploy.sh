#!/bin/bash

(echo "versions([" && git tag | grep "^holy\-.\+$" | sed "s/^/'/g" | sed "s/$/',/g" && echo "'master']);") > WebContent/props/all-versions.js

./minify.sh

http_proxy=
https_proxy=
appcfg.py $* update WebContent

