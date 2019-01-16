import React from 'react'
import renderer from 'react-test-renderer'
import {
  AlertDanger,
  AlertSuccess,
  AlertWarning,
  AlertEmpty,
  AlertFyi,
} from '../../components/alert'

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
        <AlertSuccess>
          <p>This is an alert</p>
        </AlertSuccess>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders an empty alert correctly', () => {
    const tree = renderer
      .create(
        <AlertEmpty>
          <p>This is an alert</p>
        </AlertEmpty>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders an fyi alert correctly', () => {
    const tree = renderer
      .create(
        <AlertFyi>
          <p>This is an alert</p>
        </AlertFyi>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
