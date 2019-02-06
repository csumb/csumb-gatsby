const path = require(`path`)
const report = require(`gatsby-cli/lib/reporter`)

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

        createPage({
          path: 'everything',
          component: path.resolve('src/templates/everything/index.js'),
          context: {
            topLevelItems: topLevelItems,
            is404: false,
          },
        })

        report.success(`built event listing pages.`)

        return
      })
    )
  })
}
