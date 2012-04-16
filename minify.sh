#!/bin/bash

echo "Minify files"
FILES_JS=$(find WebContent -name "*.js" | grep -v "\.min\.js")
FILES_CSS=$(find WebContent -name "*.css" | grep -v "\.min\.css")
echo "Total: js: $(echo "$FILES_JS" | wc -l), css: $(echo "$FILES_CSS" | wc -l)" 

(echo "$FILES_JS" && echo "$FILES_CSS") | while read k; do
	echo "Minify: $k";
	java -jar lib/yuicompressor-2.4.7.jar --nomunge -o "$(echo "$k" | sed "s/\.\([jscss]\+\)$/\.min\.\1/g")" "$k";
done

echo "index.min.html"
INDEX_HTML=$(sed "s/\.\([jscss]\+\)\"/\.min\.\1\"/g" WebContent/index.html | sed "s/\.min\.min\./\.min\./g")

echo "WebContent/min/holy.min.js"
echo "$INDEX_HTML" | tail -n +2 | xpath -q -e "//head/script[@type='text/javascript']/@src" | cut -d"\"" -f2 | sed "s/^/WebContent\//g" | xargs cat | java -jar lib/yuicompressor-2.4.7.jar --type js --nomunge -o WebContent/min/holy.min.js

echo "WebContent/min/holy.min.css"
echo "$INDEX_HTML" | tail -n +2 | xpath -q -e "//head/link[@rel='stylesheet']/@href" | cut -d"\"" -f2 | sed "s/^/WebContent\//g" | xargs cat | java -jar lib/yuicompressor-2.4.7.jar --type css --nomunge -o WebContent/min/holy.min.css

rm -rf WebContent/min/imgs
echo "WebContent/imgs"
find WebContent -name "imgs" | grep -v "WebContent/min/imgs" | while read k; do 
	cp -R "$k" WebContent/min ; 
done

echo "Minified"

