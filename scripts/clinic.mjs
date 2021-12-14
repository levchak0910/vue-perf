#!/usr/bin/env zx

import "zx/globals"

import {
  vitePort,
  viteUrl,
  nuxtPort,
  nuxtUrl,
  viteLibPort,
  viteLibUrl,
  fastifyPort,
  fastifyUrl,
  nextPort,
  nextUrl,
} from "../config/urls.mjs"

import {amount, connections, workers} from "../config/autocannon.mjs"

import { killProcessesOnPort } from "../functions/kill-processes-on-port.mjs"

const commands = ["doctor", "bubbleprof", "flame", "heapprofiler"]
const shortCommands = ["d", "b", "f", "h"].reduce((o, c, i) => ({...o, [c]: commands[i]}), {})
const arg = process.argv[3]?.length === 1 ? shortCommands[process.argv[3]] : process.argv[3]
const command = commands.includes(arg) ? arg : commands[0]

await $`yarn k`

async function writeClinicReport(port, url, script, name) {
  const clinic = $`PORT=${port} NODE_ENV=production node node_modules/.bin/clinic ${command} --open=false --dest=clinic -- node ${script}`
  await sleep(1000)

  await $`yarn autocannon ${url} -a ${amount} -c ${connections} -w ${workers}`
  await killProcessesOnPort(port, {ctrlC: true})

  const output = await clinic
  const outputLine = output.stdout.split("\n").find(l => l.includes("HTML"))
  const filePath = "/" + outputLine.split("///")[1]

  let fileContent = await fs.readFile(filePath, {encoding: "utf-8"})
  fileContent = fileContent.replace("<title>Clinic Doctor</title>", `<title>Doctor for ${name} project</title>`)

  await fs.writeFile(filePath, fileContent)

  $`xdg-open ${filePath}`
}

const promises = [
  [nuxtPort, nuxtUrl, "app/nuxt/.output/server/index.mjs", "Nuxt"],
  [vitePort, viteUrl, "app/vite-ssr/server-prod.js", "Custom Vite"],
  [viteLibPort, viteLibUrl, "app/vssrlib/server.js", "Vite SSR lib"],
  [fastifyPort, fastifyUrl, "app/fastify/server/main.js", "Fastify"],
  // problems with cwd
  // [nextPort, nextUrl, "app/next/node_modules/next/dist/bin/next start", "Next"],
].map(args => writeClinicReport(...args))

await Promise.all(promises)

