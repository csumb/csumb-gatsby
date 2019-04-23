const path = require(`path`)
const fs = require('fs-extra')
const publicPath = path.resolve('./public')

const processAttributes = attributes => {
  let result = {}
  if (!attributes.length) {
    return result
  }
  attributes = attributes.split(',')
  attributes.forEach(attribute => {
    attribute = attribute.trim().split('=')
    if (typeof result[attribute[0]] === 'undefined') {
      result[attribute[0]] = []
    }
    result[attribute[0]].push(attribute[1])
  })
  return result
}

const start = async (graphql, publicPath) => {
  const result = await graphql(`
    {
      allCatalogCsv {
        edges {
          node {
            id
            CRSE_ID
            SUBJECT
            CATALOG_NBR
            COURSE_TITLE_LONG
            DESCRLONG
            UNITS_MINIMUM
            UNITS_MAXIMUM
            TERM
            CRSE_ATTR_LIST
            GRADING_BASIS
          }
        }
      }
    }
  `)

  if (result.errors) {
    console.log(result.errors)
    throw new Error(`Catalog had a problem getting results from GraphQL.`)
  }

  const courses = {
    ge: {},
    ur: {},
    subject: {},
  }
  result.data.allCatalogCsv.edges.forEach(({ node }) => {
    const attributes = processAttributes(node.CRSE_ATTR_LIST)
    if (typeof courses.subject[node.SUBJECT.toLowerCase()] === 'undefined') {
      courses.subject[node.SUBJECT.toLowerCase()] = []
    }
    courses.subject[node.SUBJECT.toLowerCase()].push(node)
    if (typeof attributes.GE !== 'undefined') {
      attributes.GE.forEach(code => {
        if (typeof courses.ge[code] === 'undefined') {
          courses.ge[code] = []
        }
        courses.ge[code].push(node)
      })
    }
    if (typeof attributes.UR !== 'undefined') {
      attributes.UR.forEach(code => {
        if (typeof courses.ur[code] === 'undefined') {
          courses.ur[code] = []
        }
        courses.ur[code].push(node)
      })
    }
  })

  Object.keys(courses).forEach(key => {
    Object.keys(courses[key]).forEach(codeKey => {
      courses[key][codeKey].sort((a, b) => {
        if (a.SUBJECT !== b.SUBJECT) {
          return a.SUBJECT.localeCompare(b.SUBJECT)
        }
        if (
          parseInt(a.CATALOG_NBR) === parseInt(b.CATALOG_NBR) &&
          a.SECTION > b.SECTION
        ) {
          return 1
        }
        if (
          parseInt(a.CATALOG_NBR) === parseInt(b.CATALOG_NBR) &&
          a.SECTION < b.SECTION
        ) {
          return -1
        }
        if (parseInt(a.CATALOG_NBR) > parseInt(b.CATALOG_NBR)) {
          return 1
        }
        if (a.SECTION > b.SECTION) {
          return 1
        }
        return -1
      })
      fs.outputJson(
        `${publicPath}/catalog/json/${key}/${codeKey.toLowerCase()}.json`,
        courses[key][codeKey]
      )
    })
  })
  console.log('Wrote catalog JSON files')
}

exports.onPostBuild = async ({ graphql }) => {
  await start(graphql, publicPath)
}
