#!/usr/bin/env zx

import "zx/globals"

$`
cd app/nuxt
yarn build
`

$`
cd app/vite-ssr
yarn build
`

$`
cd app/fastify-vite
yarn build
`

$`
cd app/next
yarn build
`

