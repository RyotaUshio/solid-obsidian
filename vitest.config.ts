import { defineConfig } from 'vitest/config'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig(({ mode }) => {
  // to test in server environment, run with "--mode ssr" or "--mode test:ssr" flag
  // loads only server.test.ts file
  const testSSR = mode === 'test:ssr' || mode === 'ssr'

  return {
    plugins: [
      solidPlugin({
        // https://github.com/solidjs/solid-refresh/issues/29
        hot: false,
        // For testing SSR we need to do a SSR JSX transform
        solid: { generate: testSSR ? 'ssr' : 'dom' },
      }),
    ],
    test: {
      watch: false,
      isolate: !testSSR,
      env: {
        NODE_ENV: testSSR ? 'production' : 'development',
      },
      environment: testSSR ? 'node' : 'jsdom',
      testTransformMode: { web: ['**/*.{tsx,jsx}'], },
      ...(testSSR
        ? {
          include: ['test/server.test.{ts,tsx}'],
        }
        : {
          include: ['test/*.test.{ts,tsx}'],
          exclude: ['test/server.test.{ts,tsx}'],
        }),
    },
    resolve: {
      conditions: testSSR ? ['node'] : ['browser', 'development'],
    },
  }
})
