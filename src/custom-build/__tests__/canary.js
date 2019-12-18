const fs = require('fs-extra')

describe('Canary', () => {
  it('has an academics page', () => {
    const exists = fs.pathExistsSync('./public/academicss/index.html')
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

  it('has a catalog website', () => {
    const exists = fs.pathExistsSync('./public/catalog/index.html')
    expect(exists).toBe(true)
  })

  it('has an about website', () => {
    const exists = fs.pathExistsSync('./public/about/index.html')
    expect(exists).toBe(true)
  })

  it('has a person profile page', () => {
    const exists = fs.pathExistsSync(
      './public/directory/person/emochoa/index.html'
    )
    expect(exists).toBe(true)
  })
})
