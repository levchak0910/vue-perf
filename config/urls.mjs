import dotenv from 'dotenv'
dotenv.config()
 

export const nuxtPort=process.env.NUXT_PORT
export const vitePort=process.env.VITE_PORT
export const fastifyPort=process.env.FASTIFY_PORT
export const nextPort=process.env.NEXT_PORT

export const nuxtUrl=`http://localhost:${nuxtPort}`
export const viteUrl=`http://localhost:${vitePort}`
export const fastifyUrl=`http://localhost:${fastifyPort}`
export const nextUrl=`http://localhost:${nextPort}`
