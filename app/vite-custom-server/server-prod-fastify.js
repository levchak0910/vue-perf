const path = require("path");
const fs = require("fs");

const fastify = require("fastify")({ logger: false });
const fastifyStatic = require("@fastify/static");

const resolve = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(resolve("dist/client/index.html"), "utf-8");
const render = require("./dist/server/entry-server.js").render;
const manifest = require("./dist/client/ssr-manifest.json");

fastify.register(fastifyStatic, {
  root: resolve(path.join("dist", "client", "assets")),
  prefix: "/assets/",
});
fastify.get("/favicon.ico", async (request, reply) => {
  return reply.sendFile("favicon.ico", resolve(path.join("dist", "client")));
});

fastify.get("*", async (request, reply) => {
  const {
    renderedHtml,
    preloadLinks,
    headTags,
    htmlAttrs,
    bodyAttrs,
  } = await render({}, manifest);

  // if (shouldRedirectTo !== undefined) {
  //   res.writeHead(301, { Location: shouldRedirectTo }).end();
  //   return;
  // }

  const html = template
    .replace("<!--preload-links-->", preloadLinks)
    .replace("<!--app-html-->", renderedHtml)
    .replace("<html>", `<html${htmlAttrs}>`)
    .replace("<body>", `<body${bodyAttrs}>`)
    .replace("<!--head-tags-->", headTags);

  // if (notFoundError) {
  //   res.writeHead(404).end();
  // }

  reply.type("text/html");
  return html;
});

// Run the server!
const start = async () => {
  const PORT = process.env.PORT || 3000;
  try {
    await fastify.listen(PORT);
    console.log(`server started on http://localhost:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
