const fs = require('fs-extra')

fs.readJson('./_web-content/_data/directory.json', (err, directory) => {
  if (err) {
    console.log(err)
    return
  }
  directory.forEach(person => {
    let email = person.email.split('@').shift()
    fs.outputJson(`./public/directory/json/${email}.json`, person)
  })
})
