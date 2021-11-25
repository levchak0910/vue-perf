#!/usr/bin/env zx

import "zx/globals"

$`
cd app/vite-ssr
yarn build
`

$`
cd app/nuxt
yarn build
`

