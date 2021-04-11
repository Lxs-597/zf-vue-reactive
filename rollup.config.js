import ts from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import serve from 'rollup-plugin-serve'
import path from 'path'

export default {
  input: './src/index.ts',
  output: {
    name: 'VueReactivity',
    format: 'umd',
    file: path.resolve(__dirname, 'dist/reactivity.js'),
    sourcemap: true
  },
  plugins: [
    nodeResolve({
      extensions: ['.js', '.ts'],
    }),
    ts({
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    }),
    replace({
      'process.env.NODE_ENV': 'development'
    }),
    serve({
      openPage: '/public/index.html',
      port: 3001,
      contentBase: ['public', 'dist'],
    })
  ]
}
