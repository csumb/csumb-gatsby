import React from 'react'
import renderer from 'react-test-renderer'
import { AlertDanger, AlertInfo, AlertWarning } from '../../components/alert'

describe('Alert', () => {
  it('renders a danger alert correctly', () => {
    const tree = renderer
      .create(
        <AlertDanger>
          <p>This is an alert</p>
        </AlertDanger>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders a warning alert correctly', () => {
    const tree = renderer
      .create(
        <AlertWarning>
          <p>This is an alert</p>
        </AlertWarning>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders an info alert correctly', () => {
    const tree = renderer
      .create(
        <AlertInfo>
          <p>This is an alert</p>
        </AlertInfo>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
