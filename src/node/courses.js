
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    const courseTemplate = path.resolve(`src/templates/course.js`)
    // Query for CSV content from catalog
    resolve(
      graphql(
        `
        {
          allCatalogCsv {
            edges {
              node{
                CRSE_ID
                SUBJECT
                CATALOG_NBR
                COURSE_TITLE_LONG
                DESCRLONG
                UNITS_MINIMUM
                UNITS_MAXIMUM
                CRSE_OFFER_NBR
                TERM
                CRSE_ATTR_LIST
              }
            }
          }
        }
    `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }
        result.data.allFile.edges.forEach(async edge => {
          createPage({
            path: `${edge.node.SUBJECT.toLowerCase()}/${edge.node.CATALOG_NBR.toLowerCase()}`,
            component: courseTemplate,
            layout: 'index',
            context: {
              course: edge.node
            }
          })
          
        })

        return
      })
    )
  })
}