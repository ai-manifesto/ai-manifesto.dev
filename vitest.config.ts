import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    // Intentionally set to node - decided not to use nuxt module for test utils
    environment: 'node',
  },
  resolve: {
    alias: {
      // seems to be needed to get shard dir working
      '#shared': resolve(__dirname, './shared'),
      '~': resolve(__dirname, './'),
    },
  },
})
