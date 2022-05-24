#!/usr/bin/env zx

import "zx/globals"

import {nuxtPort, vitePort, viteLibPort, fastifyPort, fvbPort, nextPort} from "../config/urls.mjs"

import { killProcessesOnPorts } from "../functions/kill-processes-on-port.mjs"

await killProcessesOnPorts([nuxtPort, vitePort, viteLibPort, fastifyPort, fvbPort, nextPort], {exit: true})
