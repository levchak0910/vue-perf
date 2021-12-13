#!/usr/bin/env zx

import "zx/globals"

import {nuxtPort, vitePort, viteLibPort, fastifyPort, nextPort} from "../config/urls.mjs"

import { killProcessesOnPorts } from "../functions/kill-processes-on-port.mjs"

await killProcessesOnPorts([nuxtPort, vitePort, viteLibPort, fastifyPort, nextPort], {exit: true})
