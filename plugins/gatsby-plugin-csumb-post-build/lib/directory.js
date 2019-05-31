const fs = require('fs-extra')
const path = require('path')
const publicPath = path.resolve('./public')
const dataPath = path.resolve('./_web-content')

module.exports = reporter => {
  return new Promise((resolve, reject) => {
    fs.readJson(`${dataPath}/_data/departments.json`, (err, departments) => {
      const allDeparments = {}
      departments.forEach(department => {
        department.unit_code.forEach(code => {
          allDeparments[code] = department
        })
      })
      fs.readJson(`${dataPath}/_data/buildings.json`, (err, buildings) => {
        fs.readJson(`${dataPath}/_data/directory.json`, (err, directory) => {
          if (err) {
            console.log(err)
            return
          }
          directory.forEach(person => {
            let email = person.email.split('@').shift()
            let login = person.login.split('@').shift()
            fs.readJson(
              `${dataPath}_data/public-directory/${login}.json`,
              (err, directory) => {
                if (
                  directory &&
                  typeof buildings[directory.buildingCode] !== 'undefined'
                ) {
                  directory.building = buildings[directory.buildingCode].name
                }
                person._publicDirectory = directory ? directory : false

                if (
                  typeof person.directoryDepartmentID !== 'undefined' &&
                  Array.isArray(person.directoryDepartmentID)
                ) {
                  person._fullDepartments = []
                  person.directoryDepartmentID.forEach(code => {
                    if (typeof allDeparments[code] !== 'undefined') {
                      person._fullDepartments.push(allDeparments[code])
                    }
                  })
                }

                fs.outputJson(
                  `${publicPath}/directory/json/${email}.json`,
                  person
                )
              }
            )
          })
          resolve()
        })
      })
    })
  })
}
