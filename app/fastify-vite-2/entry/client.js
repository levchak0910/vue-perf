import { createApp } from './main'
const { app, router } = createApp()

// hydrate(app)

// Wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => app.mount('#app', true))
