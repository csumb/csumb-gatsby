const fs = require('fs-extra')
const moment = require('moment')

const content = {
  stamp: moment().unix(),
  format: moment().format('MMMM, D, YYYY h:mm:ss a'),
}

fs.outputJson('./public/_last-build.json', content)
