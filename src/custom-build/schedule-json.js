const fs = require('fs-extra')
const parse = require('csv-parse')

const parseOptions = {
  columns: true,
  delimiter: ',',
  ltrim: true,
}

fs.readFile('./_data/schedule.csv', (err, schedule) => {
  const sections = {}
  const parser = parse(parseOptions)
  parser.on('readable', () => {
    let record
    while ((record = parser.read())) {
      let section = {}
      Object.keys(record).forEach(key => {
        section[key.toLowerCase()] = record[key]
      })
      section._meetings = []
      sections[`${section.strm}-${section.crn}`] = section
    }
  })

  parser.on('end', () => {
    fs.readFile('./_data/meeting_pat.csv', (err, schedule) => {
      const parser = parse(parseOptions)

      parser.on('readable', () => {
        let record
        while ((record = parser.read())) {
          let meeting = {}
          Object.keys(record).forEach(key => {
            meeting[key.toLowerCase()] = record[key]
          })
          sections[`${meeting.strm}-${meeting.crn}`]._meetings.push(meeting)
        }
      })

      parser.on('end', () => {
        Object.keys(sections).forEach(key => {
          fs.outputJson(
            `./public/schedule/json/${sections[key].strm}/${
              sections[key].crn
            }.json`,
            sections[key]
          )
        })
      })

      parser.write(schedule)
      parser.end()
    })
  })

  parser.write(schedule)
  parser.end()
})

/*fs.readJson('./_web-content/_data/buildings.json', (err, buildings) => {
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

          fs.outputJson(`./public/directory/json/${email}.json`, person)
        }
      )
    })
  })
})
*/