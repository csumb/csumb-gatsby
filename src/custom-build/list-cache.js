const fs = require('fs')

const fsutils = require('../../node_modules/firebase-tools/lib/fsutils')
const path = require('path')

var projectRootDir = process.cwd()
while (
  !fsutils.fileExistsSync(path.resolve(projectRootDir, './firebase.json'))
) {
  var parentDir = path.dirname(projectRootDir)
  if (parentDir === projectRootDir) {
    return null
  }
  projectRootDir = parentDir
}
console.log(`Firebase path is: ${projectRootDir}`)
