// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxtjs/seo',
    '@vueuse/nuxt',
    'nuxt-auth-utils',
    '@nuxtjs/tailwindcss',
  ],
  tailwindcss: {
    cssPath: '@/assets/global.css',
    configPath: './tailwind.config.ts',
  },
  site: {
    name: 'The AI Manifesto: Using AI responsibly in Development and Collaboration',
    description: 'A manifesto to guide responsible AI usage.',
    url: 'https://ai-manifesto.dev',
  },
  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon.svg',
        },
      ],
    },
  },
  css: ['@/assets/global.css'],
  nitro: {
    compressPublicAssets: true,
    routeRules: {
      '/api/signees/**': {
        headers: {
          'Cache-Control': 'public, max-age=60, s-maxage=60',
        },
      },
      '/api/auth/**': {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      },
      '/auth/**': {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      },
      '/badge/**': {
        headers: {
          'Cache-Control': 'public, max-age=86400',
        },
      },
    },
  },
  vite: {
    css: {
      devSourcemap: true,
    },
  },
  runtimeConfig: {
    pagination: {
      defaultLimit: 21,
      maxLimit: 50,
    },
    oauth: {
      github: {
        clientId: '',
        clientSecret: '',
      },
      linkedin: {
        clientId: '',
        clientSecret: '',
        redirectURL: '',
      },
    },
    session: {
      name: 'nuxt-session',
      password: '',
      maxAge: 60 * 60 * 24 * 7,
      cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
      },

    },
    public: {
      pagination: {
        defaultLimit: 21,
      },
    },
  },
})
