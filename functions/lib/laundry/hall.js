module.export = async (hall, request, response) => {
  fetch(
    `https://www.laundryalert.com/cgi-bin/csumb721/LMRoom?XallingPage=LMPage&Halls=${
      request.params.hall
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
      response.end()
    })
}
