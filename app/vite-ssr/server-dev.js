// @ts-check
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import express from 'express'
import { createServer as createViteServer } from 'vite'

export async function createServer() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const resolve = (p) => path.resolve(__dirname, p)

  const app = express()

  /**
   * @type {import('vite').ViteDevServer}
   */
  const viteServer = await createViteServer({
    root: process.cwd(),
    logLevel: "error",
    server: {
      middlewareMode: true,
      watch: {
        usePolling: true,
        interval: 100
      },
    },
    appType: 'custom'
  })
  app.use(viteServer.middlewares)

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl

      let template = fs.readFileSync(resolve("index.html"), "utf-8");
      template = await viteServer.transformIndexHtml(url, template);
      const { render } = await viteServer.ssrLoadModule("/src/entry-server.ts");

      const {html: appHtml, preloadLinks} = await render({})

      const html = template
        .replace(`<!--app-html-->`, appHtml)
        .replace(`<!--preload-links-->`, preloadLinks)

      res
        .status(200)
        .set({ 'Content-Type': 'text/html' })
        .end(html)
    } catch (e) {
      viteServer.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })

  return { app }
}

createServer().then(({ app }) =>
  app.listen(3000, () => {
    console.log('http://localhost:3000')
  })
)