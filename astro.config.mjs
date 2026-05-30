import { defineConfig } from 'astro/config'

export default defineConfig({
  // use existing `site/` folder as the public directory so current asset paths (/assets/...) keep working
  publicDir: 'site',
})
