#!/bin/bash -eo pipefail

./node_modules/.bin/grunt
./node_modules/.bin/gatsby build
npm run directoryJson
npm run configFirebase
npm run canary
./node_modules/.bin/firebase deploy --token=$FIREBASE_TOKEN -P develop