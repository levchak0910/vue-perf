#!/usr/bin/env zx

import "zx/globals"

import {nuxtUrl, viteUrl, vitePlugUrl, viteLibUrl} from "../config/urls.mjs"

$`xdg-open ${nuxtUrl}`

$`xdg-open ${viteUrl}`

$`xdg-open ${vitePlugUrl}`

$`xdg-open ${viteLibUrl}`

