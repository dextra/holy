#!/bin/bash


VERSION=$1

if [ "x$VERSION" == "x" ]; then
	echo "release.sh <version>";
	echo "";
	exit 1;
fi

TAG="holy-$VERSION"

echo "$VERSION" > WebContent/props/version.txt
git commit -a -m "releasing $VERSION"
#git push

git tag -a "$TAG" -m "releasing $TAG"
#git push --tags

echo "master" > WebContent/props/version.txt
git commit -a -m "releasing $VERSION"
git push --tags

git pull
