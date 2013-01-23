#!/bin/bash

rm -rf gae
mkdir gae

wget -O gae/google-appengine.zip "http://googleappengine.googlecode.com/files/google_appengine_1.7.4.zip"

cd gae
unzip google-appengine.zip
