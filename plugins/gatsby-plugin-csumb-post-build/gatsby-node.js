const buildTime = require('./lib/build-time')
const catalog = require('./lib/catalog')
const directory = require('./lib/directory')
const events = require('./lib/events')

exports.onPostBuild = ({ reporter }) => {
  return new Promise((resolve, reject) => {
    const postBuildTimer = reporter.activityTimer(
      'Building JSON data files for catalog & directory'
    )
    buildTime(reporter)
      .then(() => {
        return catalog(reporter)
      })
      .then(() => {
        return directory(reporter)
      })
      .then(() => {
        return events(reporter)
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
