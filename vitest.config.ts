import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    globals: true,
    environment: 'node',
    clearMocks: true,
    include: ['lib/**/*.test.ts', 'data/**/*.test.ts'],
    exclude: ['node_modules', '.next', 'coverage'],
    coverage: {
      provider: 'v8',
      clean: true,
      exclude: ['**/*.test.ts', 'node_modules/**', '.next/**', 'coverage/**'],
      reporter: ['lcov'],
      reportsDirectory: 'coverage',
    },
  },
})
