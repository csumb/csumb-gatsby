import { readdirSync } from 'fs'
import replace from '@rollup/plugin-replace'

const functions = []
readdirSync('./src/functions/functions', { withFileTypes: true })
  .filter(directoryEntry => directoryEntry.isDirectory())
  .map(directoryEntry => {
    const { name } = directoryEntry
    functions.push({
      input: `./src/functions/functions/${name}/index.js`,
      external: [
        '@okta/okta-sdk-nodejs',
        'moment',
        '@sendgrid/mail',
        'octonode',
        'md5',
        'base-64',
        'node-fetch',
        'querystring',
        'saml2-js',
      ],
      output: {
        file: `./functions/${name}.js`,
        format: 'cjs',
      },
      plugins: [
        replace({
          'process.env.CSUMB_FUNCTIONS_USER_SALT': `'${
            process.env.CSUMB_FUNCTIONS_USER_SALT
          }'`,
        }),
      ],
    })
  })

export default functions
