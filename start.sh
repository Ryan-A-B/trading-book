#!/bin/bash

docker run --rm -it \
    -v $(pwd):$(pwd) \
    -w $(pwd) \
    -p 3000:3000 \
    node:16 yarn start