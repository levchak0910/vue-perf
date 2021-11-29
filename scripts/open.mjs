#!/usr/bin/env zx

import "zx/globals"

import {nuxtUrl, viteUrl, vitePlugUrl, viteLibUrl, fastifyUrl} from "../config/urls.mjs"

$`xdg-open ${nuxtUrl}`

$`xdg-open ${viteUrl}`

$`xdg-open ${viteLibUrl}`

$`xdg-open ${fastifyUrl}`

