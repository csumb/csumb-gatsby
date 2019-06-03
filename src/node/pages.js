const path = require(`path`)
const report = require(`gatsby-cli/lib/reporter`)
const cryptex = require('node-cryptex')

const encryptFeedback = email => {
  if (!email) {
    return null
  }
  const iv = new Buffer.alloc(16)
  return cryptex.encrypt(email, process.env.CSUMB_FEEDBACK_KEY, iv)
}

module.exports = (graphql, actions) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    const pageTemplate = path.resolve(`src/templates/page.js`)
    let sites = {}

    resolve(
      graphql(
        `
          {
            site {
              siteMetadata {
                overridePages
              }
            }

            allCsumbSite {
              edges {
                node {
                  site
                  title
                  staffPage
                  social {
                    url
                    site
                  }
                  contact {
                    phone
                    email
                    floor
                    suite
                    fax
                    building {
                      name
                      code
                    }
                  }
                }
              }
            }

            allCsumbNavigation {
              edges {
                node {
                  site
                  navigation
                }
              }
            }

            allCsumbPage {
              edges {
                node {
                  pagePath
                  title
                  site
                  pageContent
                  drupalNid
                  embedTargetSite
                  topHero {
                    headline
                    text
                    buttonUrl
                    buttonText
                    position
                    image {
                      url
                    }
                  }
                  navigation {
                    url
                    name
                  }
                  breadcrumbs
                  feedbackEmail
                  layout
                  event {
                    dates {
                      start
                      end
                    }
                    times {
                      start
                      end
                    }
                    image
                    description
                    ticket {
                      url
                      title
                    }
                    cost_message
                    location {
                      type
                      description
                      room
                      url
                      building {
                        name
                        code
                      }
                      address {
                        organisation
                        street
                        premise
                        city
                        state
                        zip
                      }
                    }
                  }
                }
              }
            }
            allAirtable(
              filter: { queryName: { in: ["UniversityPersonnelPages"] } }
              sort: { fields: [data___Name] }
            ) {
              edges {
                node {
                  id
                  table
                  recordId
                  data {
                    Name
                    Content
                    Page_ID
                    Link
                    Parent {
                      id
                      data {
                        Page_ID
                        Name
                        Notes
                        Link
                      }
                    }
                    Documents {
                      id
                      data {
                        Name
                        Notes
                        Attachments {
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
            {
              allCsumbDirectory {
                edges {
                  node {
                    user {
                      firstName
                      lastName
                      directoryBuilding
                      directoryBuildingCode
                      directoryJobClass
                      directoryTitle
                      directoryDepartment
                      directoryPhone
                      email
                      _publicProfile {
                        phone
                        biography
                        photo
                        buildingCode
                        location
                        appointmentCalendar
                        officeHours
                        resume
                      }
                      fullDepartments {
                        name
                        website
                      }
                    }
                  }
                }
              }
              allCsumbBuilding {
                edges {
                  node {
                    buildingName
                    code
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (!result.data) {
          report.error(`Could not query content pages.`)
          return
        }
        const overridePages = result.data.site.siteMetadata.overridePages
        let count = 0

        const upForms = {}
        const upPages = {}
        const buildings = {}
        const allUsers = {}
        result.data.allCsumbBuilding.edges.forEach(building => {
          buildings[building.node.code] = building.node.buildingName
        })

        result.data.allCsumbDirectory.edges.forEach(({ node }) => {
          const building =
            node.user._publicProfile &&
            node.user._publicProfile.buildingCode &&
            typeof buildings[node.user._publicProfile.buildingCode] !==
              'undefined'
              ? buildings[node.user._publicProfile.buildingCode]
              : ''
          allUsers[node.user.emailuser] = {
            user: node.user,
            building: building,
          }
        })

        result.data.allAirtable.edges.forEach(edge => {
          const data = edge.node.data
          if (data.Page_ID) {
            upForms[data.Page_ID] = data
            if (data.Parent) {
              data.Parent.forEach(parent => {
                if (typeof upPages[parent.data.Page_ID] === 'undefined') {
                  upPages[parent.data.Page_ID] = []
                }
                upPages[parent.data.Page_ID].push(edge)
              })
            }
          }
        })

        result.data.allCsumbSite.edges.forEach(({ node }) => {
          if (typeof sites[node.site] === 'undefined') {
            sites[node.site] = {
              site: node,
              navigation: null,
            }
          }
        })

        result.data.allCsumbNavigation.edges.forEach(({ node }) => {
          if (typeof sites[node.site] !== 'undefined') {
            sites[node.site].navigation = node.navigation
          }
        })

        result.data.allCsumbPage.edges.forEach(({ node }) => {
          if (
            typeof sites[node.site] !== 'undefined' &&
            overridePages.indexOf(node.pagePath) === -1
          ) {
            const pagePersonBlocks = {}
            const pageContent = JSON.parse(node.pageContent)
            if (pageContent.blocks) {
              Object.keys(pageContent.blocks).forEach(id => {
                if (pageContent.blocks[id].type === 'person') {
                  pagePersonBlocks[pageContent.blocks[id].data.email] =
                    typeof allUsers[pageContent.blocks[id].data.email] !==
                    'undefined'
                      ? allUsers[pageContent.blocks[id].data.email]
                      : false
                }
              })
            }
            count++
            let pageNode = {
              path: node.pagePath,
              component: pageTemplate,
              layout: 'index',
              context: {
                filePath: node.pagePath,
                pageUrl: node.pagePath,
                title: node.title,
                site: sites[node.site].site,
                breadcrumbs: node.breadcrumbs,
                pageNavigation: node.navigation,
                feedbackEmail: encryptFeedback(node.feedbackEmail),
                layout: node.layout,
                personBlocks: pagePersonBlocks,
                navigation: sites[node.site].navigation,
                pageContent: node.pageContent,
                embedTargetSite: node.embedTargetSite,
              },
            }
            if (
              typeof node.drupalNid !== 'undefined' &&
              typeof upForms[parseInt(node.drupalNid)] !== 'undefined'
            ) {
              pageNode.context.upForms = upForms[parseInt(node.drupalNid)]
            }
            if (
              typeof node.drupalNid !== 'undefined' &&
              typeof upPages[parseInt(node.drupalNid)] !== 'undefined'
            ) {
              pageNode.context.upPages = upPages[parseInt(node.drupalNid)]
              pageNode.context.upPageID = parseInt(node.drupalNid)
            }
            if (typeof node.drupalNid !== 'undefined') {
              pageNode.context.drupalNid = node.drupalNid
            }
            if (typeof node.event !== 'undefined') {
              pageNode.context.event = node.event
            }
            if (node.topHero.image) {
              pageNode.context.topHero = node.topHero
            }
            createPage(pageNode)
          }
        })
        report.success(`built ${count} web pages`)
        return
      })
    )
  })
}
