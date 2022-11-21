import {execSync} from "child_process"

/**
 * @typedef Options
 * @type {object}
 * @property {boolean} [ctrlC]
 * @property {boolean} [exit]
 * @property {boolean} [log]
 */

/**
 * @typedef ProcessId
 * @type {number|string}
 */

/**
 * @param {ProcessId} processId 
 * @param {Options} options 
 */
export async function killProcess (processId, options = {}) {
  let mod = ""
  if (options.ctrlC) mod = " -2"
  if (options.exit) mod = " -9"

  try {
    // execSync(`kill${mod} ${processId}`)
    execSync("kill" + mod +" " + processId)
  }
  catch (e) {
    if (options.log) console.error(e);
  }
}

/**
 * @param {Array<number|string>} processId 
 * @param {Options} options 
 */
export async function killProcesses (processIds, options = {}) {
  for await (const processId of processIds) {
    await killProcess(processId, options)
  }
}
