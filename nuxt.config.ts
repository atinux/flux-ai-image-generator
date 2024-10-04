// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-30',
  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  future: { compatibilityVersion: 4 },

  // https://nuxt.com/modules
  modules: [
    '@nuxthub/core',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@kgierke/nuxt-basic-auth'
  ],

  // https://hub.nuxt.com/docs/getting-started/installation#options
  hub: {
    ai: true,
    blob: true,
  },

  basicAuth: {
    enabled: process.env.NODE_ENV === 'production',
    allowedRoutes: ['/api/_hub/'],
    users: [
      {
        username: process.env.USERNAME || 'admin',
        password: process.env.PASSWORD || 'admin'
      }
    ]
  },

  // https://eslint.nuxt.com
  eslint: {
    config: {
      stylistic: {
        quotes: 'single'
      }
    }
  },

  // https://devtools.nuxt.com
  devtools: { enabled: true }
})