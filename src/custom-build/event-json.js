const walk = require('walk')
const moment = require('moment')
const fs = require('fs-extra')

const allEvents = {}
const cutOffDate = moment().subtract(1, 'days')
const walker = walk.walk('./_web-content')

walker.on('file', function(root, fileStats, next) {
  if (fileStats.name.search('.json') === -1 || root.search('_data') > -1) {
    next()
    return
  }
  fs.readFile(`${root}/${fileStats.name}`, (err, data) => {
    const pageData = JSON.parse(data)
    if (
      typeof pageData.uuid === 'undefined' ||
      typeof pageData.event === 'undefined' ||
      typeof pageData.event.dates === 'undefined'
    ) {
      next()
      return
    }
    pageData.event.dates.forEach(date => {
      const start = moment(date.start)
      if (start.isBefore(cutOffDate)) {
        return
      }
      const key = start.format('YYYY/M')
      const day = start.format('D')
      if (typeof allEvents[key] === 'undefined') {
        allEvents[key] = []
      }
      allEvents[key].push(day)
    })
    next()
  })
})

walker.on('end', () => {
  delete allEvents['Invalid date']
  Object.keys(allEvents).forEach(date => {
    fs.outputJSON(`./public/events/json/${date}.json`, [
      ...new Set(allEvents[date]),
    ])
  })
})
