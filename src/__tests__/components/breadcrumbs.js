import React from 'react'
import renderer from 'react-test-renderer'
import Breadcrumbs from 'components/header/breadcrumbs'

const sampleBreadcrumbs = JSON.stringify([
  {
    href: '/',
    title: 'CSUMB Home',
  },
  {
    title: 'About CSUMB',
    href: '/about',
  },
])

describe('Breadcrumbs', () => {
  it('renders breadcrumbs correctly', () => {
    const tree = renderer
      .create(<Breadcrumbs breadcrumbs={sampleBreadcrumbs} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('returns null for no breadcrumbs', () => {
    const tree = renderer.create(<Breadcrumbs breadcrumbs={''} />).toJSON()
    expect(tree).toBeNull()
  })
})
