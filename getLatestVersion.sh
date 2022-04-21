#!/bin/zsh
cd /Users/ken/github/gittag 1>2
git fetch origin main 1>2
git checkout main 1>2
LATEST_VERSION=`git tag | egrep -e "^\d+\.\d+\.\d+$" | sort | tail -1` 1>2

echo -n $LATEST_VERSION