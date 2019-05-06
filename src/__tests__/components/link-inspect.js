import React, { Component } from 'react'
import renderer from 'react-test-renderer'
import LinkInspect from 'components/utilities/link-inspect'

describe('LinkInspect', () => {
  it('renders a base relative URL correctly', () => {
    const tree = renderer
      .create(<LinkInspect to="/location">A link</LinkInspect>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders an absolute relative URL correctly', () => {
    const tree = renderer
      .create(<LinkInspect to="https://google.com">A link</LinkInspect>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders nothing if there is no "to" prop', () => {
    const tree = renderer.create(<LinkInspect>A link</LinkInspect>).toJSON()
    expect(tree).toBeNull()
  })
})
