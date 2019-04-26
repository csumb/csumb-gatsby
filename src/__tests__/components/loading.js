import React from 'react'
import renderer from 'react-test-renderer'
import Loading from '../../components/common/loading'

describe('Loading', () => {
  it('renders a loading indicator correctly', () => {
    const tree = renderer.create(<Loading>I am loading!</Loading>).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders a loading indicator correctly without children', () => {
    const tree = renderer.create(<Loading />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
