const fs = require('fs-extra')
const moment = require('moment')
const tx = require('moment-timezone')
const path = require('path')

module.exports = reporter => {
  return new Promise((resolve, reject) => {
    const publicPath = path.resolve('./public')
    const content = {
      stamp: moment()
        .tz('America/Los_Angeles')
        .unix(),
      format: moment()
        .tz('America/Los_Angeles')
        .format('MMMM D, YYYY h:mm a'),
    }

    reporter.log(`Saving last build time as ${content.format}`)

    fs.outputJsonSync(`${publicPath}/_last-build.json`, content)
    resolve()
  })
}
