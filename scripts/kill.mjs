#!/usr/bin/env zx

import "zx/globals"

import {viteNodePort, nuxtPort, vitePort, viteLibPort, fastifyPort, fvbPort, nextPort, fcPort} from "../config/urls.mjs"

import { killProcessesOnPorts } from "../functions/kill-processes-on-port.mjs"

await killProcessesOnPorts([viteNodePort, nuxtPort, vitePort, viteLibPort, fastifyPort, fvbPort, nextPort, fcPort], {exit: true})
