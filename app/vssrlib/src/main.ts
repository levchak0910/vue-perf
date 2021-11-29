import viteSSR from 'vite-ssr/vue'
import App from './App.vue'

import AppFetch from "./business/Fetch.vue";

export default viteSSR(App, { routes: [{
  path: "/",
  component: AppFetch
}] })