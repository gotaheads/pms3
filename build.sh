
echo "build"
./node_modules/grunt-cli/bin/grunt --force
echo "remove less files"
sed -i '/.less"/d' dist/index.html


