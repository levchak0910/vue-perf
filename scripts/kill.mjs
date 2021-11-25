#!/usr/bin/env zx

import "zx/globals"

import {nuxtPort, vitePort} from "../config/urls.mjs"

async function killOnPort (port) {
  try {
    const processOutput = await $`lsof -i :${port} | grep ${port}`
    const processes = processOutput.toString().split("\n")
    let processIds = processes.map(p => p.split(" ").filter(Boolean)[1]).filter(Boolean)
    processIds = [...new Set(processIds)]
    for await (const processId of processIds) {
      await $`kill ${processId}`
    }
  }
  catch (e) {
    console.log(`Skipped for port: ${port}`)
  }
}

[nuxtPort, vitePort].forEach(killOnPort)


