#!/usr/bin/env zx

import "zx/globals"

$`
cd app/vite-koa
yarn build
`

$`
cd app/nuxt
yarn build
`

$`
cd app/vite-ssr-lib-express
yarn build
`

$`
cd app/fastify-vite-2
yarn build
`

$`
cd app/fastify-vite-3_beta
yarn build
`

$`
cd app/next
yarn build
`

