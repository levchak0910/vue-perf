<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <Suspense>
        <component :is="Component" />
      </Suspense>
    </router-view>
  </div>
</template>

<script>
import { useHead } from '@vueuse/head'
import { useRoute } from 'vue-router'

export default {
  setup () {
    const route = useRoute()
    const host = import.meta.env.SSR ? 'localhost' : window.location.host

    useHead({
      link: [
        // We use route.path since we don't use query parameters
        { rel: 'canonical', href: `https://${host}${route.path}` }
      ]
    })
  }
}
</script>
