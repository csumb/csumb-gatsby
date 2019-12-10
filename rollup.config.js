import { readdirSync } from 'fs'

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
    })
  })

export default functions
