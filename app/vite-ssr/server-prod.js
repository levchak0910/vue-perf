const http = require("http");

const path = require("path");
const fs = require("fs");
const fsProm = require("fs/promises");

const resolve = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(resolve("dist/client/index.html"), "utf-8");
const render = require("./dist/server/entry-server.js").render;
const manifest = require("./dist/client/ssr-manifest.json");

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

  const {
    renderedHtml,
    notFoundError,
    shouldRedirectTo,
    preloadLinks,
    headTags,
    htmlAttrs,
    bodyAttrs,
  } = await render({}, manifest);

  if (shouldRedirectTo !== undefined) {
    res.writeHead(301, { Location: shouldRedirectTo }).end();
    return;
  }

  const html = template
    .replace("<!--preload-links-->", preloadLinks)
    .replace("<!--app-html-->", renderedHtml)
    .replace("<html>", `<html${htmlAttrs}>`)
    .replace("<body>", `<body${bodyAttrs}>`)
    .replace("<!--head-tags-->", headTags);

  if (notFoundError) {
    res.writeHead(404).end();
  }

  res.writeHead(200, { "Content-Type": extensions.html }).end(html);
};

const server = http.createServer(requestListener);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`server started on http://localhost:${PORT}`));
