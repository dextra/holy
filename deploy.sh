#!/bin/bash

(echo "versions([" && git tag | grep "^holy\-2\.2\..\+$" | sed "s/^/'/g" | sed "s/$/',/g" && echo "'master']);") >  WebContent/props/all-versions.js

http_proxy=
https_proxy=
appcfg.py --insecure update WebContent

