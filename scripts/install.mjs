#!/usr/bin/env zx

import "zx/globals"

$`
cd app/nuxt
yarn install
`

$`
cd app/vite-ssr
yarn install
`

$`
cd app/fastify-vite
yarn install
`

$`
cd app/next
yarn install
`

