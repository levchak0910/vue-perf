#!/usr/bin/env zx

import "zx/globals"

import autocannon from "autocannon"
import prettyBytes from "pretty-bytes"

import {nuxtUrl, viteUrl} from "../config/urls.mjs"
import {amount, connections, workers} from "../config/autocannon.mjs"

import prettyObjects from "../utils/pretty-object.mjs"

await $`yarn k`
$`yarn r`

await sleep(2000)

const getResult = (name, obj, initial={}) => {
  const requiredFields = ["p1", "p10", "p25", "p50", "p75", "p90", "p99", "min", "max", "average"]
  return requiredFields.reduce((o, k) => ({ ...o, [k]: obj[k] }), { name, ...initial })
}

function getPerf(name, url) {
  return new Promise((resolve, reject) => {
    autocannon({
      url,
      amount,
      connections,
      workers,
    }, async (err, res) => {
      if (err) {
        reject(err)
        return
      }

      resolve({
        latency: getResult(name, res.latency, { total: res.latency.totalCount }),
        requests: getResult(name, res.requests, { total: res.requests.total }),
        throughput: getResult(name, res.throughput, { total: res.requests.total }),
      })
    })
  })
}

const [nuxt, vite] = await Promise.all([
  getPerf("nuxt", nuxtUrl),
  getPerf("vite", viteUrl),
]);

const prettyKey = (key) => {
  if(/^p\d/.test(key)) {
    key = key.replace("p", "")
    key = `${key}%`
  }

  return key
}

const prettyResult = (type, obj, index) => {
  const format = {
    latency: v => `${v} ms`,
    requests: v => `${v} rps`,
    throughput: prettyBytes,
  }[type]

  return Object.entries(obj).reduce((o, [k, v]) => {
    if(k === "name" || k === "total") o[k] = v
    else o[prettyKey(k)] = (index >= 2 ? v : format(v))
    return o
  }, {})
}

// TODO throughout is not correct because in vite ssr deduplication is not realized
// for await (const key of ["latency", "requests", "throughput"]) {
for await (const key of ["latency", "requests"]) {
  const nuxtPerfData = nuxt[key]
  const vitePerfData = vite[key]

  const rel = (key, type, a, b) => key === "name" ? type : `${(a[key] / b[key] * 100).toFixed(2)}%`
  const nuxtBetterVite = Object.entries(nuxtPerfData).reduce((o, [k, v]) => ({ ...o, [k]: rel(k, "nuxt", nuxtPerfData, vitePerfData) }), {})
  const viteBetterNuxt = Object.entries(vitePerfData).reduce((o, [k, v]) => ({ ...o, [k]: rel(k, "vite", vitePerfData, nuxtPerfData) }), {})

  const which = (key, aType, bType, a, b) => key === "name" ? "better" : (a[key] === b[key] ? "==" : (a[key] < b[key] ? bType : aType))
  const better = Object.entries(vitePerfData).reduce((o, [k, v]) => ({ ...o, [k]: which(k, "vite", "nuxt", vitePerfData, nuxtPerfData) }), {})

  // TODO improve comparison
  // const objects = [nuxtPerfData, vitePerfData, nuxtBetterVite, viteBetterNuxt, better].map((o, i) => prettyResult(key, o, i))
  const objects = [nuxtPerfData, vitePerfData].map((o, i) => prettyResult(key, o, i))
  await fs.writeFile(`./store/perf-${key}.log`, prettyObjects(...objects))
}

await $`yarn k`

process.exit(1)
