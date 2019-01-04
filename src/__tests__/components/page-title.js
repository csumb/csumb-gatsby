import React from 'react'
import renderer from 'react-test-renderer'
import PageTitle from 'components/header/page-title'

describe('Breadcrumbs', () => {
  it('renders a page title', () => {
    const tree = renderer
      .create(<PageTitle layout="page">The page title</PageTitle>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders sub titles for sites', () => {
    const tree = renderer
      .create(
        <PageTitle layout="page" sub="Sub title">
          The page title
        </PageTitle>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders nothing for sites', () => {
    const tree = renderer
      .create(<PageTitle layout="site">The page title</PageTitle>)
      .toJSON()
    expect(tree).toBeNull()
  })
})
