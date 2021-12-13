#!/usr/bin/env zx

import "zx/globals"

import {nuxtUrl, viteUrl, viteLibUrl, fastifyUrl, nextUrl} from "../config/urls.mjs"

$`xdg-open ${nuxtUrl}`

$`xdg-open ${viteUrl}`

$`xdg-open ${viteLibUrl}`

$`xdg-open ${fastifyUrl}`

$`xdg-open ${nextUrl}`

