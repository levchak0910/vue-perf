#!/usr/bin/env zx

import "zx/globals"

import {vitePort, nuxtPort, vitePlugPort, viteLibPort} from "../config/urls.mjs"

$`
cd app/vite-ssr
PORT=${vitePort} yarn serve
`

$`
cd  app/nuxt
PORT=${nuxtPort} yarn start
`

$`
cd  app/vsrrpl
PORT=${vitePlugPort} yarn server
`

$`
cd  app/vssrlib
PORT=${viteLibPort} yarn serve
`
