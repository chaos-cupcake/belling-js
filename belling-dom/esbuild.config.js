import { build } from "esbuild"
import { nodeExternalsPlugin } from "esbuild-node-externals"

build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  platform: 'browser',
  outfile: './dist/index.js',
  minify: true,
  sourcemap: true,
  target: "es6",
  format: "esm",
  plugins: [nodeExternalsPlugin()],
});
