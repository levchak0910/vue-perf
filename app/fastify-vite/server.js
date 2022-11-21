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

const PORT = process.env.PORT

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const server = await main()
  await server.listen({ port: PORT })
  console.log(`server started at: http://localhost:${PORT}`)
}
