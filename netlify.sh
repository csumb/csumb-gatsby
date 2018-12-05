#!/bin/bash

grunt local
gatsby build

if [ ! -f ./public/_redirects ]; then
    echo "Gatsby did not build correctly"
    exit 1
fi
echo "Gatsby built  correctly"
npm run storybookbuild
exit
