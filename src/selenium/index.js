const { Builder, By, Key } = require('selenium-webdriver')
const academics = require('./tests/academics')

const server = `http://${process.env.SAUCELABS_USER}:${
  process.env.SAUCELABS_KEY
}@ondemand.saucelabs.com:80/wd/hub`

const chrome = new Builder()
  .forBrowser('chrome')
  .usingServer(server)
  .build()

const firefox = new Builder()
  .forBrowser('firefox')
  .usingServer(server)
  .build()

const ie = new Builder()
  .withCapabilities({
    browserName: 'internet explorer',
    platform: 'Windows 10',
    version: '11.285',
  })
  .usingServer(server)
  .build()

const drivers = [chrome, firefox, ie]

drivers.forEach(driver => {
  academics(driver, By, Key)
})
