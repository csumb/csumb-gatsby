const fetch = require('node-fetch')
const cheerio = require('cheerio')

const cleanText = text => {
  return text.replace('\n', '').trim()
}

module.exports = (request, response) => {
  fetch(`https://www.laundryalert.com/cgi-bin/csumb721/LMPage`)
    .then(response => {
      return response.text()
    })
    .then(body => {
      const $ = cheerio.load(body)
      const rooms = []
      $('#tableb tr:has(a)').each((index, item) => {
        const room = {}
        const path = $(item)
          .find('a')
          .attr('href')

        room.id = path.match(/Halls=([0-9]*)/)[1]
        room.lookup = `/cloud-functions/laundry/hall?hall=${room.id}`
        room.name = cleanText(
          $(item)
            .find('a')
            .text()
        )

        room.washers = {
          available: cleanText(
            $(item)
              .find('td')
              .eq(2)
              .text()
          ),
          inUse: cleanText(
            $(item)
              .find('td')
              .eq(5)
              .text()
          ),
        }
        room.driers = {
          available: cleanText(
            $(item)
              .find('td')
              .eq(3)
              .text()
          ),
          inUse: cleanText(
            $(item)
              .find('td')
              .eq(7)
              .text()
          ),
        }
        rooms.push(room)
      })
      response.write(JSON.stringify(rooms))
      return response.end()
    })
    .catch(error => {
      console.log(error)
      response.write(JSON.stringify({ error: true }))
      response.end()
    })
}
