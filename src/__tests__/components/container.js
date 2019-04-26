import React from 'react'
import renderer from 'react-test-renderer'
import Container from 'components/common/container'

describe('Container', () => {
  it('renders container correctly', () => {
    const tree = renderer.create(<Container>The children!</Container>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders container correctly with top padding', () => {
    const tree = renderer
      .create(<Container topPadding>The children!</Container>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
