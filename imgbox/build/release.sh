#!/bin/bash
#
# Release code
#

T="/tmp"

question() {
	echo -n "$1? "
	read ANSWER
}

echo "Run Lint"
yarn run lint
rc=$?
if [ $rc -nq 0 ]
then
	echo 'error: lint failed'
	exit $rc
fi

echo "Package version"
grep "version" package.json

git tag | sort -V
question "New version (x.x.x)"
if [ "$ANSWER" = "" ]
then
	echo "Error: no tag"
	exit 1
fi
export VERSION="$ANSWER"

./build/build.sh

echo "Update package"
sed 's/"version": ".*"/"version": "'"$VERSION"'"/' package.json > $T/package.json
mv "$T/package.json" package.json

# Sorry, my program that helps checking in, diffs and commits
gitstatus

question "Do you want to create git tags"
if [ "$ANSWER" = "y" ]
then

	echo "Tagging code"
	git tag "v$VERSION"
	git push --tag

	echo "Moving latest"
	git tag -f latest
	git push -f --tag

	echo "Pushing..."
fi

question "Publish to NPM"
if [ "$ANSWER" = "y" ]
then
	npm login
	npm publish
fi
