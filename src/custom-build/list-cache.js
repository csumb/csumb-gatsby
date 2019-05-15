const path = require('path')
const fs = require('fs')
const directoryPath = path.join(__dirname, '../../.firebase')
console.log('Cache files: ')
fs.readdir(directoryPath, function(err, files) {
  if (err) {
    return console.log('Unable to scan directory: ' + err)
  }
  files.forEach(function(file) {
    console.log(file)
  })
})
