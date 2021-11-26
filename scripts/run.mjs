#!/usr/bin/env zx

import "zx/globals"

import {vitePort, nuxtPort, vitePlugPort} from "../config/urls.mjs"

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
