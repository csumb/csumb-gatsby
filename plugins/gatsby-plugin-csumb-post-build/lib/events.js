const moment = require('moment')
const fs = require('fs-extra')
const path = require('path')
const publicPath = path.resolve('./public')
const dataPath = path.resolve('./_web-content')

module.exports = (reporter, graphql) => {
  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          allCsumbPage(
            filter: {
              event: { _passedEvent: { eq: false }, public: { eq: true } }
            }
            sort: { fields: [event____sortDate], order: ASC }
            limit: 500
          ) {
            edges {
              node {
                event {
                  dates {
                    start
                    end
                  }
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          reject(result.errors)
          return
        }

        const allEvents = {}
        result.data.allCsumbPage.edges.forEach(({ node }) => {
          if (node.event && node.event.dates) {
            node.event.dates.forEach(date => {
              const start = moment(date.start)
              const key = start.format('YYYY/M')
              const day = start.format('D')
              if (typeof allEvents[key] === 'undefined') {
                allEvents[key] = []
              }
              allEvents[key].push(day)
            })
          }
        })

        delete allEvents['Invalid date']
        Object.keys(allEvents).forEach(date => {
          fs.outputJSON(`${publicPath}/events/json/${date}.json`, [
            ...new Set(allEvents[date]),
          ])
        })
      })
    )
  })
}
