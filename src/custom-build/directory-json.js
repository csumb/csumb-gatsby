const fs = require('fs-extra')
fs.readJson('./_web-content/_data/departments.json', (err, departments) => {
  const allDeparments = {}
  departments.forEach(department => {
    department.unit_code.forEach(code => {
      allDeparments[code] = department
    })
  })
  fs.readJson('./_web-content/_data/buildings.json', (err, buildings) => {
    fs.readJson('./_web-content/_data/directory.json', (err, directory) => {
      if (err) {
        console.log(err)
        return
      }
      directory.forEach(person => {
        let email = person.email.split('@').shift()
        let login = person.login.split('@').shift()
        fs.readJson(
          `./_web-content/_data/public-directory/${login}.json`,
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

            fs.outputJson(`./public/directory/json/${email}.json`, person)
          }
        )
      })
    })
  })
})
