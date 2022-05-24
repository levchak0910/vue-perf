#!/usr/bin/env zx

import "zx/globals"

import {vitePort, nuxtPort, viteLibPort, fastifyPort, fvbPort, nextPort} from "../config/urls.mjs"

$`
cd app/vite-koa
PORT=${vitePort} yarn serve
`

$`
cd  app/nuxt
PORT=${nuxtPort} yarn start
`

$`
cd  app/vite-ssr-lib-express
PORT=${viteLibPort} yarn serve
`

$`
cd  app/fastify-vite-2
PORT=${fastifyPort} yarn serve
`

$`
cd  app/fastify-vite-3_beta
PORT=${fvbPort} yarn start
`

$`
cd  app/next
PORT=${nextPort} yarn start
`
