const path = require(`path`)
const fs = require('fs-extra')
const publicPath = path.resolve('./public')
const moment = require('moment')
const tx = require('moment-timezone')

exports.onPostBuild = () => {
  const content = {
    stamp: moment()
      .tz('America/Los_Angeles')
      .unix(),
    format: moment()
      .tz('America/Los_Angeles')
      .format('MMMM, D, YYYY h:mm a'),
  }

  fs.outputJson(`${publicPath}/_last-build.json`, content)
  console.log(`Wrote build time as ${content.format}`)
}
