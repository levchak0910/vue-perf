import dotenv from 'dotenv'
dotenv.config()
 

export const viteNodePort=process.env.VITE_NODE_PORT
export const vitePort=process.env.VITE_SSR_PORT
export const nuxtPort=process.env.NUXT_PORT
export const viteLibPort=process.env.VITE_SSR_LIBRARY_PORT
export const fastifyPort=process.env.FASTIFY_PORT
export const fvbPort=process.env.FASTIFY_VITE_BETA_PORT
export const fcPort=process.env.FASTIFY_CUSTOM_PORT
export const nextPort=process.env.NEXT_PORT

export const viteNodeUrl=`http://localhost:${viteNodePort}`
export const viteUrl=`http://localhost:${vitePort}`
export const nuxtUrl=`http://localhost:${nuxtPort}`
export const viteLibUrl=`http://localhost:${viteLibPort}`
export const fastifyUrl=`http://localhost:${fastifyPort}`
export const fvbUrl=`http://localhost:${fvbPort}`
export const fcUrl=`http://localhost:${fcPort}`
export const nextUrl=`http://localhost:${nextPort}`
