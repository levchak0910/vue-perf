#!/usr/bin/env zx

import "zx/globals"

import {nuxtPort, vitePort, fastifyPort, nextPort} from "../config/urls.mjs"

$`
cd  app/nuxt
PORT=${nuxtPort} yarn start
`

$`
cd  app/vite-ssr
PORT=${vitePort} yarn serve
`

$`
cd  app/fastify-vite
PORT=${fastifyPort} yarn start
`

$`
cd  app/next
PORT=${nextPort} yarn start
`
