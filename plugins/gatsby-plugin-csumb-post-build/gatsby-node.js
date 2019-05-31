const buildTime = require('./lib/build-time')
const catalog = require('./lib/catalog')
const events = require('./lib/events')

exports.onPostBuild = ({ reporter, graphql }) => {
  return new Promise((resolve, reject) => {
    const postBuildTimer = reporter.activityTimer(
      'Building JSON data files for catalog & directory'
    )
    buildTime(reporter)
      .then(() => {
        return catalog(reporter)
      })
      .then(() => {
        return events(reporter, graphql)
      })
      .then(() => {
        postBuildTimer.start()
        postBuildTimer.end()
        resolve()
      })
      .catch(error => {
        reporter.error(`Post build error: ${error}`)
      })
  })
}
