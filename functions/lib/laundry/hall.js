const fetch = require('node-fetch')
const cheerio = require('cheerio')

const cleanText = text => {
  return text.replace('\n', '').trim()
}

module.exports = (request, response) => {
  fetch(
    `https://www.laundryalert.com/cgi-bin/csumb721/LMRoom?XallingPage=LMPage&Halls=${
      request.query.hall
    }`
  )
    .then(response => {
      return response.text()
    })
    .then(body => {
      const $ = cheerio.load(body)
      const machines = []
      $('form table')
        .eq(2)
        .find('tr:has(input)')
        .each((index, item) => {
          const machine = {}
          machine.number = cleanText(
            $(item)
              .find('td')
              .eq(2)
              .text()
          )
          machine.type = cleanText(
            $(item)
              .find('td')
              .eq(3)
              .text()
          )
          machine.status = cleanText(
            $(item)
              .find('td')
              .eq(4)
              .text()
          )
          machine.timeRemaining = cleanText(
            $(item)
              .find('td')
              .eq(5)
              .text()
          )
          machines.push(machine)
        })
      response.write(JSON.stringify(machines))
      return response.end()
    })
    .catch(error => {
      response.write(JSON.stringify({ error: true }))
      response.end()
    })
}
