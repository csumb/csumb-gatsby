const fs = require('fs-extra')
const parse = require('csv-parse')
const path = require('path')
const publicPath = path.resolve('./public')
const dataPath = path.resolve('./_data')

const parseOptions = {
  columns: true,
  delimiter: ',',
  ltrim: true,
}

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

module.exports = reporter => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${dataPath}/catalog.csv`, (err, catalog) => {
      const courses = {
        ge: {},
        ur: {},
        subject: {},
      }
      const parser = parse(parseOptions)
      parser.on('readable', () => {
        let record
        while ((record = parser.read())) {
          const attributes = processAttributes(record.CRSE_ATTR_LIST)
          if (
            typeof courses.subject[record.SUBJECT.toLowerCase()] === 'undefined'
          ) {
            courses.subject[record.SUBJECT.toLowerCase()] = []
          }
          courses.subject[record.SUBJECT.toLowerCase()].push(record)
          if (typeof attributes.GE !== 'undefined') {
            attributes.GE.forEach(code => {
              if (typeof courses.ge[code] === 'undefined') {
                courses.ge[code] = []
              }
              courses.ge[code].push(record)
            })
          }
          if (typeof attributes.UR !== 'undefined') {
            attributes.UR.forEach(code => {
              if (typeof courses.ur[code] === 'undefined') {
                courses.ur[code] = []
              }
              courses.ur[code].push(record)
            })
          }
        }
      })

      parser.on('end', () => {
        reporter.log(`Writing ${Object.keys(courses).length} course data files`)
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

        resolve()
      })

      parser.write(catalog)
      parser.end()
    })
  })
}
