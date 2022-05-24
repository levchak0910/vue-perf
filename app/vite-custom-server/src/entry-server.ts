import { createSSRApp } from "vue";
import { renderToString } from "@vue/server-renderer";
import { createHead, renderHeadToString } from "@vueuse/head";

import App from "./App.vue";

import Harlem from "@harlem/core";
import { createServerSSRPlugin, getBridgingScriptBlock } from "@harlem/plugin-ssr";

import type { ParameterizedContext } from "koa";

export async function render (
  ctx: ParameterizedContext,
  manifest: Record<string, string[]>,
): Promise<{
    renderedHtml: string
    preloadLinks: string
    notFoundError: boolean
    shouldRedirectTo: string | undefined
    headTags: string
    htmlAttrs: string
    bodyAttrs: string
  }> {
  const app = createSSRApp(App);

  app.use(Harlem, { plugins: [createServerSSRPlugin()] });

  const head = createHead();
  app.use(head);

  const renderCtx: {modules?: string[]} = {};
  let renderedHtml = await renderToString(app, renderCtx);
  renderedHtml += getBridgingScriptBlock();

  const { headTags, htmlAttrs, bodyAttrs } = renderHeadToString(head);

  const preloadLinks = renderPreloadLinks(renderCtx.modules, manifest);

  return {
    renderedHtml,
    preloadLinks,
    notFoundError: false,
    shouldRedirectTo: undefined,
    headTags,
    htmlAttrs,
    bodyAttrs,
  };
}

function renderPreloadLinks (modules: undefined | string[], manifest: Record<string, undefined | string[]>): string {
  let links = "";
  const seen = new Set();
  if (modules === undefined) throw new Error();
  modules.forEach((id) => {
    const files = manifest[id];
    if (files !== undefined) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file);
          links += renderPreloadLink(file);
        }
      });
    }
  });
  return links;
}

function renderPreloadLink (file: string): string {
  if (file.endsWith(".js")) {
    return `<link rel="modulepreload" crossorigin href="${file}">`;
  }
  else if (file.endsWith(".css")) {
    return `<link rel="stylesheet" href="${file}">`;
  }
  else {
    return "";
  }
}
