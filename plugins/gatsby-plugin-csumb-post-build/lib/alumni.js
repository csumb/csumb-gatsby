const fs = require('fs-extra')
const fetch = require('node-fetch')
const path = require('path')
const publicPath = path.resolve('./public')

module.exports = (reporter, graphql) => {
  return new Promise((resolve, reject) => {
    if (typeof process.env.CSUMB_ELIGIBLE_ALUMNI === 'undefined') {
      reporter.log('No alumni to import')
      resolve()
      return
    }
    fetch(process.env.CSUMB_ELIGIBLE_ALUMNI)
      .then(response => {
        return response.text()
      })
      .then(list => {
        const alumni = list.split('\n')
        alumni.forEach(user => {
          fs.outputJSONSync(
            `${publicPath}/_alumni/json/${user.toLowerCase()}.json`,
            { user: user.toLowerCase() }
          )
        })
        reporter.log(`Saved ${alumni.length} eligible alumni records`)
        resolve()
      })
  })
}
