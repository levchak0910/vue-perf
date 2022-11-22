import http from "node:http"

import path from "node:path"
import { fileURLToPath } from 'node:url'
import fs from "node:fs"
import fsProm from "node:fs/promises"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const resolve = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(resolve("dist/client/index.html"), "utf-8");
const { render } = await import('./dist/server/entry-server.js')
const manifest = JSON.parse(fs.readFileSync(resolve('dist/client/ssr-manifest.json'), 'utf-8'))

const extensions = {
  js: "text/javascript",
  css: "text/css",
  ico: "image/x-icon",
  html: "text/html; charset=UTF-8",
};

/**
 *
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
const requestListener = async function (req, res) {
  // send static file
  if (req.url.startsWith("/assets") || req.url === "/favicon.ico") {
    try {
      const file = resolve(path.join("dist", "client", req.url));
      const data = await fsProm.readFile(file);
      const ext = path.extname(req.url).slice(1);
      res.writeHead(200, { "Content-Type": extensions[ext] });
      res.end(data);
    } catch (error) {
      res.writeHead(404);
      res.end("Not found");
    }

    return;
  }

  const { html: appHtml, preloadLinks } = await render(manifest);

  const html = template
    .replace("<!--preload-links-->", preloadLinks)
    .replace("<!--app-html-->", appHtml)
  
  res
    .writeHead(200, { "Content-Type": extensions.html })
    .end(html);
};

const server = http.createServer(requestListener);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`server started on http://localhost:${PORT}`));
