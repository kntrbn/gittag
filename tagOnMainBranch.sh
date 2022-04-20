#!/bin/zsh
cd /Users/ken/github/gittag
git fetch origin main
git add .
git commit -m "Commit by gittag"
git tag 0.1.2 main
git push gittag main
git push --tags gittag
