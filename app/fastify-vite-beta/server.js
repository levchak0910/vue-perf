import Fastify from 'fastify'
import FastifyVite from 'fastify-vite'
import renderer from './renderer.js'
import ky from 'ky-universal'

const server = Fastify({ ignoreTrailingSlash: true })
const root = import.meta.url
const PORT = process.env.PORT || 3000

server.decorate('ky', ky.create({
  prefixUrl: 'http://localhost:3000/',
}))

server.get('/api/todo-list', (_, reply) => {
  reply.send([
    'Do laundry',
    'Respond to emails',
    'Write report',
  ])
})

server.setErrorHandler((err, req, reply) => {
  console.error(err)
  reply.code(500)
  reply.send(err)
})

await server.register(FastifyVite, { root, renderer })

await server.vite.ready()
await server.listen(PORT)

console.log("server started on http://localhost:" + PORT)