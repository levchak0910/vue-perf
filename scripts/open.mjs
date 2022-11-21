#!/usr/bin/env zx

import "zx/globals"

import * as config from "../config/urls.mjs"

const urls = Object.keys(config).filter(key => key.endsWith("Url")).map(urlKey => config[urlKey])

urls.forEach(url => {
  $`xdg-open ${url}`
})
