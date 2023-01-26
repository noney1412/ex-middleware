import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: true,
  minify: false,
  silent: true,
  clean: true,
  watch: true,
  onSuccess: 'node dist/index.js',
  env: {
    PORT: '3000',
  },
});
