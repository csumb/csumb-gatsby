const fs = require('fs-extra')
const config = require('../../gatsby-config')
const firebase = fs.readJsonSync('./firebase-start.json')
firebase.hosting.redirects = []

fs.readJson('./_web-content/_data/redirects.json', (err, redirects) => {
  if (err) {
    console.log(err)
    return
  }
  Object.keys(redirects).forEach(source => {
    let destination = redirects[source]
    if (source != destination && source != 'schedule') {
      if (destination.search(/http(s?):\/\//) == -1) {
        destination = `/${destination}`
      }
      firebase.hosting.redirects.push({
        source: `/${source}`,
        destination: destination,
        type: 301,
      })
    }
  })

  console.log(`Wrote ${firebase.hosting.redirects.length} redirects`)
  fs.outputJson('./firebase.json', firebase, { spaces: 2 })
})
