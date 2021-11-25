import Table from "cli-table3"

export default function prettyObjects (...objects) {
  const table = new Table({ head: Object.keys(objects[0]) })
  objects.forEach(obj => table.push(Object.values(obj)))
  const str = table.toString().replaceAll("[39m", "").replaceAll("[90m", "").replaceAll("", "").replaceAll("[31m", "")
  return str
}