#!/bin/zsh
TAGNAME=$1

cd /Users/ken/github/gittag
git fetch origin main
git add .
git commit -m "Commit by gittag"
git tag $TAGNAME main
git push gittag main
git push --tags gittag
