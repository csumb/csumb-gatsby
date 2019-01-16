module.exports = async (driver, By, Key) => {
  try {
    await driver.get('http://beta.csumb.edu')
    await driver.findElement(By.linkText('Majors & programs')).click()
    await driver.findElement(By.id('id3')).sendKeys('history')
    await driver.findElement(By.id('id3')).sendKeys(Key.RETURN)
  } finally {
    await driver.quit()
  }
}
