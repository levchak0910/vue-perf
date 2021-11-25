import { createSSRApp } from "vue";
import { createHead } from "@vueuse/head";

import App from "./App.vue";

import Harlem from "@harlem/core";
import { createClientSSRPlugin } from "@harlem/plugin-ssr";

const app = createSSRApp(App);

app.use(Harlem, {
  plugins: [createClientSSRPlugin()],
});

const head = createHead();
app.use(head);

setTimeout(() => {
  app.mount("#app", true);
}, 1000);
