#!/usr/bin/env zx

import "zx/globals"

import {nuxtUrl, viteUrl} from "../config/urls.mjs"

$`xdg-open ${nuxtUrl}`

$`xdg-open ${viteUrl}`

