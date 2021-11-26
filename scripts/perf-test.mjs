#!/usr/bin/env zx

import "zx/globals"

import autocannon from "autocannon"
import prettyBytes from "pretty-bytes"

import {nuxtUrl, viteUrl, vitePlugUrl, viteLibUrl} from "../config/urls.mjs"
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

const [nuxt, vite, vitePlug, viteLib] = await Promise.all([
  getPerf("nuxt", nuxtUrl),
  getPerf("vite-custom", viteUrl),
  getPerf("vite-plugin", vitePlugUrl),
  getPerf("vite-library", viteLibUrl),
]);

const prettyKey = (key) => {
  if(/^p\d/.test(key)) {
    key = key.replace("p", "")
    key = `${key}%`
  }

  return key
}

const prettyResult = (type, obj) => {
  const format = {
    latency: v => `${v} ms`,
    requests: v => `${v} rps`,
    throughput: prettyBytes,
  }[type]

  return Object.entries(obj).reduce((o, [k, v]) => {
    if(k === "name" || k === "total") o[k] = v
    else o[prettyKey(k)] = format(v)
    return o
  }, {})
}

// TODO throughout is not correct because in vite ssr deduplication is not realized
// for await (const key of ["latency", "requests", "throughput"]) {
for await (const key of ["latency", "requests"]) {
  const nuxtPerfData = nuxt[key]
  const vitePerfData = vite[key]
  const vitePlugPerfData = vitePlug[key]
  const viteLibPerfData = viteLib[key]


  const objects = [nuxtPerfData, vitePerfData, vitePlugPerfData, viteLibPerfData].map((o) => prettyResult(key, o))
  await fs.writeFile(`./store/perf-${key}.log`, prettyObjects(...objects))
}

await $`yarn k`

process.exit(1)
