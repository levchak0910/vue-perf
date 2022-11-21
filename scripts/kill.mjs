#!/usr/bin/env zx

import "zx/globals"

import * as config from "../config/urls.mjs"

import { killProcessesOnPorts } from "../functions/kill-processes-on-port.mjs"

const ports = Object.keys(config).filter(key => key.endsWith("Port")).map(portKey => config[portKey])

await killProcessesOnPorts(ports, {exit: true})
