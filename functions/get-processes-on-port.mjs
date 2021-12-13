import {execSync} from "child_process"

/**
 * @typedef Options
 * @type {object}
 * @property {boolean} [log]
 */

/**
 * @typedef Port
 * @type {string|number}
 */

/**
 * @param {Port} port 
 * @param {Options} [options] 
 */
export async function getProcessesOnPort (port, options = {}) {
  try {
    const processOutput = execSync(`lsof -i :${port} | grep ${port}`).toString()
    const processes = processOutput.toString().split("\n")
    const processIds = processes.map(p => p.split(" ").filter(Boolean)[1]).filter(Boolean)
    return [...new Set(processIds)]
    
  }
  catch (e) {
    if(options.log) console.error(e);
    return []
  }
}
