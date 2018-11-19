import React from 'react'
import renderer from 'react-test-renderer'
import { Button, ButtonLink } from 'components/button'

describe('Button', () => {
  it('renders native button correctly', () => {
    const tree = renderer.create(<Button>A button!</Button>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders default button type correctly', () => {
    const tree = renderer
      .create(<Button buttonType="default">A button!</Button>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders default button type correctly', () => {
    const tree = renderer
      .create(<Button buttonType="primary">A button!</Button>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders default button type correctly', () => {
    const tree = renderer
      .create(<Button buttonType="highImpact">A button!</Button>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('ButtonLink', () => {
  it('renders link button correctly', () => {
    const tree = renderer
      .create(<ButtonLink to="/home">A link button!</ButtonLink>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders nothing if there is no "to" prop', () => {
    const tree = renderer.create(<ButtonLink>A link</ButtonLink>).toJSON()
    expect(tree).toBeNull()
  })
})
