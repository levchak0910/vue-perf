const Koa = require("koa");
const sendFile = require("koa-send");

const path = require("path");
const fs = require("fs");

const resolve = (p) => path.resolve(__dirname, p);

const clientRoot = resolve("dist/client");
const template = fs.readFileSync(resolve("dist/client/index.html"), "utf-8");
const render = require("./dist/server/entry-server.js").render;
const manifest = require("./dist/client/ssr-manifest.json");

(async () => {
  const app = new Koa();

  app.use(async (ctx) => {
    // send static file
    if (ctx.path.startsWith("/assets") || ctx.path === "/favicon.ico") {
      await sendFile(ctx, ctx.path, { root: clientRoot });
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
    } = await render(ctx, manifest);

    if (shouldRedirectTo !== undefined) {
      ctx.status = 301;
      ctx.redirect(shouldRedirectTo);
      return;
    }

    const html = template
      .replace("<!--preload-links-->", preloadLinks)
      .replace("<!--app-html-->", renderedHtml)
      .replace("<html>", `<html${htmlAttrs}>`)
      .replace("<body>", `<body${bodyAttrs}>`)
      .replace("<!--head-tags-->", headTags);

    if (notFoundError) ctx.status = 404;

    ctx.type = "text/html";
    ctx.body = html;
  });

  const PORT = process.env.PORT;
  app.listen(PORT, () => console.log(`started server on http://localhost:${PORT}`));
})();
