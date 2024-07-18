// esbuild.config.js
import { build } from 'esbuild'

build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  platform: 'node',
  target: ['es2022'],
  outdir: './dist',
  format: 'esm',
  sourcemap: true,
  external: ['./node_modules/*'],
  tsconfig: './tsconfig.json',
  logLevel: 'info', // Add this line for more verbose output
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
