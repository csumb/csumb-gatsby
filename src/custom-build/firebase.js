const fs = require('fs-extra')
const config = require('../../gatsby-config')
const firebase = fs.readJsonSync('./firebase-start.json')
firebase.hosting.redirects = []

firebase.hosting.redirects.push({
  source: 'schedule',
  destination: `schedule/${config.siteMetadata.schedule.currentTermName}`,
  type: 301,
})

fs.readJson('./_web-content/_data/redirects.json', (err, redirects) => {
  if (err) {
    console.log(err)
    return
  }
  Object.keys(redirects).forEach(source => {
    const destination = redirects[source]
    if (source != destination && source != 'schedule') {
      firebase.hosting.redirects.push({
        source: source,
        destination: destination,
        type: 301,
      })
    }
  })
  console.log(`Wrote ${firebase.hosting.redirects.length} redirects`)
  fs.outputJson('./firebase.json', firebase, { spaces: 2 })
})
