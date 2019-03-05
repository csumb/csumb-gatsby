const fs = require('fs-extra')
const moment = require('moment')
const tx = require('moment-timezone')

const content = {
  stamp: moment()
    .tz('America/Los_Angeles')
    .unix(),
  format: moment()
    .tz('America/Los_Angeles')
    .format('MMMM, D, YYYY h:mm a'),
}

fs.outputJson('./public/_last-build.json', content)
