import Fastify from 'fastify'
import FastifyVite from '@fastify/vite'
import renderer from './renderer.js'

export async function main (dev) {
  const server = Fastify({ ignoreTrailingSlash: true })

  server.setErrorHandler((err, req, reply) => {
    console.error(err)
    reply.code(500)
    reply.send(err)
  })

  await server.register(FastifyVite, {
    dev: dev ?? process.argv.includes('--dev'),
    root: import.meta.url,
    renderer
  })

  await server.vite.ready()

  return server
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const server = await main()
  await server.listen({ port: 3000 })
  console.log(`server started at: http://localhost:3000`)
}
