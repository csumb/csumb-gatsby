const fs = require('fs-extra')

const firebase = fs.readJsonSync('./firebase-start.json')
firebase.hosting.redirects = []

fs.readJson('./_web-content/_data/redirects.json', (err, redirects) => {
  if (err) {
    console.log(err)
    return
  }
  Object.keys(redirects).forEach(source => {
    const destination = redirects[source]
    if (source != destination) {
      firebase.hosting.redirects.push({
        source: source,
        destination: destination
      })
    }
  })
  fs.outputJson('./firebase.json', firebase, { spaces: 2 })
})
