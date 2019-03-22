const fs = require('fs-extra')

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
        person._publicDirectory = directory ? directory : false

        fs.outputJson(`./public/directory/json/${email}.json`, person)
      }
    )
  })
})
