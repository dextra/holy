#!/bin/bash

echo "Finding files"
FILES_JS=$(find WebContent -name "*.js" | grep -v "\.min\.js")
FILES_CSS=$(find WebContent -name "*.css" | grep -v "\.min\.css")
echo "Total: js: $(echo "$FILES_JS" | wc -l), css: $(echo "$FILES_CSS" | wc -l)" 

(echo "$FILES_JS" && echo "$FILES_CSS") | while read k; do
	echo "Minify: $k";
	java -jar lib/yuicompressor-2.4.7.jar --nomunge -o "$(echo "$k" | sed "s/\.\([jscss]\+\)$/\.min\.\1/g")" "$k";
done

echo "index.min.html"
sed "s/\.\([jscss]\+\)\"/\.min\.\1\"/g" WebContent/index.html | sed "s/\.min\.min\./\.min\./g" > WebContent/index.min.html

echo "Minified"

