const path = require(`path`)
const report = require(`gatsby-cli/lib/reporter`)
const moment = require('moment')

module.exports = (graphql, actions) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          allCsumbPage(
            filter: {
              event: { public: { eq: true }, description: { ne: null } }
            }
            sort: { fields: [event___date_stamps] }
          ) {
            edges {
              node {
                id
                title
                site
                pagePath
                event {
                  description
                  featured
                  image
                  location {
                    type
                    room
                    building {
                      code
                      name
                    }
                  }
                  ticket {
                    url
                    title
                  }
                  cost_message
                  dates {
                    start
                    end
                  }
                  date_stamps {
                    start_stamp
                    end_stamp
                  }
                  times {
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
        const template = path.resolve('src/templates/event-day.js')
        const eventsByDate = {}
        const timeCutoff = moment()
          .subtract(1, 'day')
          .unix()
        result.data.allCsumbPage.edges.forEach(edge => {
          const event = edge.node
          event.event.date_stamps.forEach(stamp => {
            if (stamp.start_stamp >= timeCutoff) {
              const date = moment.unix(stamp.start_stamp).format('YYYY/M/D')
              if (typeof eventsByDate[date] === 'undefined') {
                eventsByDate[date] = []
              }
              eventsByDate[date].push(event)
            }
          })
        })
        Object.keys(eventsByDate).forEach(date => {
          const dateParts = date.split('/')
          const dateFormat = moment()
            .set({
              year: dateParts[0],
              month: parseInt(dateParts[1]) - 1,
              date: dateParts[2],
            })
            .format('MMMM D, YYYY')

          createPage({
            path: `events/${date}`,
            component: template,
            context: {
              events: eventsByDate[date],
              date: date,
              dateFormat: dateFormat,
            },
          })
        })

        report.success(`built event listing pages.`)

        return
      })
    )
  })
}
