
const path = require(`path`)
const fs = require(`fs-extra`)
require(`gatsby-source-filesystem`)
 
module.exports = (graphql, actions) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    resolve()
    const pageTemplate = path.resolve(`src/templates/page.js`)
    let sites = {}
    
    resolve(
      graphql(
        `{
          allCsumbContentSite {
            edges {
              node {
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
            
          allFile(filter: 
            { sourceInstanceName: { eq: "web-content" } 
              extension: { eq: "json"}
            }) {
            edges {
              node {
                relativePath
                absolutePath
                childCsumbContentPage {
                  title
                  site
                  pageContent
                }
              }
            }
          }
        }
      `).then(result => {
        if(!result.data) {
          return
        }

        result.data.allCsumbContentSite.edges.forEach(edge => {
          if(typeof sites[edge.node.site] === 'undefined') {
            sites[edge.node.site] = {
              site: edge.node,
              navigation: null
            }
          }
        })

        result.data.allCsumbContentNavigation.edges.forEach(edge => {
          if(typeof sites[edge.node.site] !== 'undefined') {
            sites[edge.node.site].navigation = edge.node.navigation
          }
        })

        result.data.allFile.edges.forEach(edge => {
          if(edge.node.relativePath.search('_data') > -1) {
            return
          }
          const content = edge.node.childCsumbContentPage
          let path = edge.node.relativePath
          path = path.replace('index.json', '').replace('.json', '')
          if(typeof sites[content.site] !== 'undefined') {
            createPage({
              path: path,
              component: pageTemplate,
              layout: 'index',
              context: {
                filePath: edge.node.relativePath,
                title: content.title,
                site: sites[content.site].site,
                layout: content.layout,
                navigation: sites[content.site].navigation,
                pageContent: content.pageContent
              }
            })
          }
        })
        resolve()
      })
    )
  })
}