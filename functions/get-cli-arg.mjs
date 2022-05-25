export function getArg (names, ind = 1) {
  const cliArg = process.argv[2 + ind] || ""
  const shortNames = names.map(n => n[0])
  const shortArgs = shortNames.reduce((o, c, i) => ({...o, [c]: names[i]}), {})
  const arg = cliArg.length === 1 ? shortArgs[cliArg] : cliArg
  return names.includes(arg) ? arg : names[0]
}