#!/usr/bin/env zx

import "zx/globals"

import {
  viteNodePort,
  viteNodeUrl,
  vitePort,
  viteUrl,
  nuxtPort,
  nuxtUrl,
  viteLibPort,
  viteLibUrl,
  fastifyPort,
  fastifyUrl,
  fvbPort,
  fvbUrl,
  nextPort,
  nextUrl,
  fcPort,
  fcUrl,
} from "../config/urls.mjs"

import {amount, connections, workers} from "../config/autocannon.mjs"

import { killProcessesOnPort } from "../functions/kill-processes-on-port.mjs"
import { getArg } from "../functions/get-cli-arg.mjs"

const command = getArg(["doctor", "bubbleprof", "flame", "heapprofiler"])

await $`yarn k`

async function writeClinicReport(port, url, script, name) {
  const clinic = $`PORT=${port} NODE_ENV=production node node_modules/.bin/clinic ${command} --open=false -- node ${script}`
  await sleep(1000)

  await $`yarn autocannon ${url} -a ${amount} -c ${connections} -w ${workers}`
  await killProcessesOnPort(port, {ctrlC: true})

  const output = await clinic
  const outputLine = output.stdout.split("\n").find(l => l.includes("HTML"))
  const filePath = "/" + outputLine.split("///")[1]

  let fileContent = await fs.readFile(filePath, {encoding: "utf-8"})

  const startTag = "<title>"
  const endTag = "</title>"
  const startInd = fileContent.indexOf(startTag)
  const endInd = fileContent.indexOf(endTag)
  const start = fileContent.slice(0, startInd)
  const end = fileContent.slice(endInd + endTag.length + 1)
  fileContent = start + `<title>${name} | Clinic ${command}</title>` + end

  await fs.writeFile(filePath, fileContent)

  $`xdg-open ${filePath}`
}

const promises = [
  [nuxtPort, nuxtUrl, "app/nuxt/.output/server/index.mjs", "Nuxt"],
  [viteNodePort, viteNodeUrl, "app/vite-custom-server/server-prod-node.js", "Vite + Node"],
  [vitePort, viteUrl, "app/vite-custom-server/server-prod-koa.js", "Vite + Koa"],
  [fcPort, fcUrl, "app/vite-custom-server/server-prod-fastify.js", "Vite + Fastify"],
  [viteLibPort, viteLibUrl, "app/vite-ssr-lib-express/server.js", "Vite SSR lib + Express"],
  [fastifyPort, fastifyUrl, "app/fastify-vite-2/server/main.js", "Fastify Vite v2"],
  [fvbPort, fvbUrl, "app/fastify-vite-3_beta/server.js", "Fastify Vite v3.beta"],
  // problems with cwd
  // [nextPort, nextUrl, "app/next/node_modules/next/dist/bin/next start", "Next"],
].map(args => writeClinicReport(...args))

await Promise.all(promises)

