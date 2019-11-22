import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import { readdirSync } from 'fs'

const functions = []
readdirSync('./src/functions/functions', { withFileTypes: true })
  .filter(directoryEntry => directoryEntry.isDirectory())
  .map(directoryEntry => {
    const { name } = directoryEntry
    functions.push({
      input: `./src/functions/functions/${name}/index.js`,
      output: {
        file: `./functions/${name}.js`,
        format: 'cjs',
      },
    })
  })
console.log(functions)
export default functions
