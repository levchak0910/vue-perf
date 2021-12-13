import { getProcessesOnPort } from "../functions/get-processes-on-port.mjs"
import { killProcesses } from "../functions/kill-process.mjs"

/**
 * @param {import("./get-processes-on-port.mjs").Port} port
 * @param {import("./kill-process.mjs").Options} options
 */
export async function killProcessesOnPort(port, options = {}) {
  const processIds = await getProcessesOnPort(port)
  if(processIds.length > 0) {
    await killProcesses(processIds, options)
    console.log(`killed processes: ${processIds.length}, on port: ${port}`)
  }
  else {
    console.log(`skip for port ${port}`)
  }
}

/**
 * @param {import("./get-processes-on-port.mjs").Port[]} ports 
 * @param {import("./kill-process.mjs").Options} options 
 */
export async function killProcessesOnPorts(ports, options = {}) {
  for await (const port of ports) {
    await killProcessesOnPort(port, options)
  }
}




