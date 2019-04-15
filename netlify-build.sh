#!/bin/bash
git clone --depth 1 https://$GITHUB_TOKEN@github.com/csumb/web-data.git _data
git clone --depth 1 https://$GITHUB_TOKEN@github.com/csumb/web-content.git _web-content
npm run test
node --max_old_space_size=12000 ./node_modules/.bin/gatsby build
npm run directoryJson
npm run scheduleJson
npm run catalogJson
npm run eventJson
npm run buildJson
npm run canary