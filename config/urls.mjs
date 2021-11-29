import dotenv from 'dotenv'
dotenv.config()
 

export const vitePort=process.env.VITE_SSR_PORT
export const nuxtPort=process.env.NUXT_PORT
export const viteLibPort=process.env.VITE_SSR_LIBRARY_PORT
export const fastifyPort=process.env.FASTIFY_PORT

export const viteUrl=`http://localhost:${vitePort}`
export const nuxtUrl=`http://localhost:${nuxtPort}`
export const viteLibUrl=`http://localhost:${viteLibPort}`
export const fastifyUrl=`http://localhost:${fastifyPort}`
