rm -rf website-data || true
git clone --depth 1 https://$GITHUB_TOKEN@github.com/csumb/website-data
node --max_old_space_size=12000 ./node_modules/.bin/gatsby build
#npm run canary