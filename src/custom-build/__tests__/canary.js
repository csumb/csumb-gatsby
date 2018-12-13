const fs = require('fs-extra')

describe('Canary', () => {
  it('has an academics page', () => {
    const exists = fs.pathExistsSync('./public/academics/index.html')
    expect(exists).toBe(true)
  })

  it('has a dashboard', () => {
    const exists = fs.pathExistsSync('./public/dashboard/index.html')
    expect(exists).toBe(true)
  })

  it('has a homepage', () => {
    const exists = fs.pathExistsSync('./public/index.html')
    expect(exists).toBe(true)
  })

  it('has a directory', () => {
    const exists = fs.pathExistsSync('./public/directory/index.html')
    expect(exists).toBe(true)
  })
})
