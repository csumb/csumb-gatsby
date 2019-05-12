const path = require(`path`)
const report = require(`gatsby-cli/lib/reporter`)
const slugify = require('slugify')

module.exports = (graphql, actions) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    const template = path.resolve(
      `src/templates/departments/educationabroad/program.js`
    )
    resolve(
      graphql(`
        {
          allAirtable(
            filter: {
              data: { Publish: { eq: true } }
              queryName: { in: ["StudyAbroadProgram"] }
            }
          ) {
            edges {
              node {
                recordId
                queryName
                data {
                  Name
                  Program_Type
                  Application_Deadline_Title
                  Deadline_Text
                  Semester_Application_Instructions
                  Program_dates__Fall
                  Program_dates__Spring
                  Fall_Spring_Application_Deadline {
                    recordId
                    data {
                      Name
                    }
                  }

                  Summer_Application_Deadline {
                    recordId
                    data {
                      Name
                    }
                  }
                  Apply_Now
                  Academics_Button_1_Title
                  Academics_Button_1_Link
                  Housing_Details_Paragraph_1
                  Housing_Details_Paragraph_2
                  Housing_link
                  Campus_services {
                    recordId
                    data {
                      Name
                    }
                  }
                  Campus_Services_Link
                  Tuition
                  Education_Abroad_Application_Fee
                  Education_Abroad_Fee
                  Health_Insurance
                  Round_trip_Airfare
                  Housing_Meals
                  Financial_Aid_Available
                  Additional_Fees_May_Apply
                  About_Paragraph_1
                  About_Paragraph_2
                  About_Paragraph_3
                  Map_Coordinates
                  Summer_start_Date
                  Summer_End_Date
                  Prerequisites {
                    recordId
                    data {
                      Name
                    }
                  }
                  Countries {
                    recordId
                    data {
                      Name
                    }
                  }
                  Partner {
                    recordId

                    data {
                      Campus_Images {
                        thumbnails {
                          full {
                            url
                          }
                        }
                      }
                      City
                      Coordinates
                      Campus_website
                      International_website
                      Video_URL
                    }
                  }
                }
              }
            }
          }
          allCsumbNavigation(filter: { site: { eq: "educationabroad" } }) {
            edges {
              node {
                navigation
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          reject(result.errors)
          return
        }
        result.data.allAirtable.edges.forEach(({ node }) => {
          const slug = slugify(node.recordId.replace('rec', ''))
          createPage({
            path: `educationabroad/program/${slug}`,
            component: template,
            context: {
              program: node,
              navigation:
                result.data.allCsumbNavigation &&
                result.data.allCsumbNavigation.edges &&
                result.data.allCsumbNavigation.edges[0]
                  ? result.data.allCsumbNavigation.edges[0].node.navigation
                  : '',
            },
          })
        })

        report.success(`built education abroad program pages.`)

        return
      })
    )
  })
}
