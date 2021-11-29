#!/usr/bin/env zx

import "zx/globals"

import {vitePort, nuxtPort, viteLibPort, fastifyPort} from "../config/urls.mjs"

$`
cd app/vite-ssr
PORT=${vitePort} yarn serve
`

$`
cd  app/nuxt
PORT=${nuxtPort} yarn start
`

$`
cd  app/vssrlib
PORT=${viteLibPort} yarn serve
`

$`
cd  app/fastify
PORT=${fastifyPort} yarn serve
`
