#!/usr/bin/env zx

import "zx/globals"

import {viteNodePort, vitePort, nuxtPort, viteLibPort, fastifyPort, fvbPort, nextPort} from "../config/urls.mjs"

$`
cd app/vite-custom-server
PORT=${viteNodePort} yarn serve:node
`

$`
cd app/vite-custom-server
PORT=${vitePort} yarn serve:koa
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
