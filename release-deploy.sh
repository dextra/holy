#!/bin/bash


VERSION=$1

if [ "x$VERSION" == "x" ]; then
	echo "release.sh <version>";
	echo "";
	exit 1;
fi

rm -rf target/release-deploy
mkdir -p target/release-deploy
cd target/release-deploy
pwd

TAG="holy-$VERSION"
HOLY_URL="https://github.com/dextra/holy/zipball/$TAG"
GAE_VERSION=$(echo "$TAG" | sed "s/\./\-/g")

echo "x: $HOLY_URL"

wget --no-check-certificate -O "$TAG.zip" "$HOLY_URL"
unzip "$TAG.zip"
cd $(find -maxdepth 1 -type d -name "*holy*")

echo $GAE_VERSION

http_proxy=
https_proxy=
appcfg.py --insecure -V "$GAE_VERSION" update WebContent

