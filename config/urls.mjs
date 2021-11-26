import dotenv from 'dotenv'
dotenv.config()
 

export const vitePort=process.env.VITE_SSR_PORT
export const nuxtPort=process.env.NUXT_PORT
export const vitePlugPort=process.env.VITE_SSR_PLUGIN_PORT

export const viteUrl=`http://localhost:${vitePort}`
export const nuxtUrl=`http://localhost:${nuxtPort}`
export const vitePlugUrl=`http://localhost:${vitePlugPort}`
