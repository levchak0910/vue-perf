const fastify = require('fastify')()
const fastifyVite = require('fastify-vite')
const fastifyApi = require('fastify-api')

async function main () {
  await fastify.register(fastifyApi)
  await fastify.register(fastifyVite, {
    api: false,
    clientEntryPath: '/entry/client.js',
    serverEntryPath: '/entry/server.js'
  })

  fastify.get('/favicon.ico', (_, reply) => {
    reply.code(404)
    reply.send('')
  })
  fastify.setErrorHandler((err, _, reply) => reply.send(err))

  fastify.vite.get('/')

  const PORT = process.env.PORT || 3000
  await fastify.listen(PORT)

  console.log(`Listening at http://localhost:${PORT}`)
}

main()
