
const path = require(`path`)
const fs = require(`fs-extra`)
require(`gatsby-source-filesystem`)
 
module.exports = (graphql, actions) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    const pageTemplate = path.resolve(`src/templates/page.js`)
    let sites = {}
    let navigation = {}
    resolve(
      graphql(
        `
        {
          allCsumbContentSite {
           edges {
             node {
               id
               site
               title
             }
           }
         }  
         allCsumbContentNavigation {
          edges {
            node {
              site
              navigation
            }
          }
         }   
         allCsumbContentPage {
          edges {
            node {
              id
              relativePath
              pageContent
              title
              site
            }
          }
        }
       }`
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }
        result.data.allCsumbContentSite.edges.forEach(async edge => {
          sites[edge.node.site] = edge.node
        })
        result.data.allCsumbContentNavigation.edges.forEach(async edge => {
          navigation[edge.node.site] = edge.node
        })
        
        result.data.allCsumbContentPage.edges.forEach(async edge => {
          createPage({
            path: edge.node.relativePath,
            component: pageTemplate,
            layout: 'index',
            context: {
              filePath: edge.node.relativePath,
              title: edge.node.title,
              site: sites[edge.node.site],
              navigation: navigation[edge.node.site],
              pageContent: edge.node.pageContent
            }
          })
        })

        return
      })
    )
  })
}