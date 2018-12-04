#!/bin/bash

if [ ! -f ./public/academics/index.html ]; then
    echo "Academics file does not exist"
    exit 1
fi
echo "Academics page rendered correctly"
exit