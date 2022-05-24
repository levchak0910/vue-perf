#!/usr/bin/env zx

import "zx/globals"

$`
cd app/vite-ssr
yarn install
`

$`
cd app/nuxt
yarn install
`

$`
cd app/vssrlib
yarn install
`

$`
cd app/fastify
yarn install
`

$`
cd app/fastify-vite-beta
yarn install
`

$`
cd app/next
yarn install
`

