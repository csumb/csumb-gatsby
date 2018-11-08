import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button, ButtonLink } from 'components/button'
import typography from 'utils/typography'

typography.injectStyles()

storiesOf('ButtonLink', module)
  .add('About', () => (
    <p>
      Button links are used for making a link to a page that evokes the feeling
      of an action. Do not use button links to invoke Javascript or do something
      that changes the state of the current page, use a regular button insted.
    </p>
  ))
  .add('Default', () => <ButtonLink to="#here">A button</ButtonLink>)
  .add('Primary', () => (
    <ButtonLink to="#here" buttonType="primary">
      A primary button
    </ButtonLink>
  ))
  .add('High impact', () => (
    <ButtonLink to="#here" buttonType="highImpact">
      High impact
    </ButtonLink>
  ))

storiesOf('Button', module)
  .add('About', () => (
    <p>
      While styled the same as Button Links, buttons are for in-page actions,
      like popping open a modal or changing a value.
    </p>
  ))
  .add('Default', () => <Button>A native button</Button>)
  .add('Primary', () => <Button buttonType="primary">A primary button</Button>)
  .add('High Impact', () => (
    <Button buttonType="highImpact">High impact</Button>
  ))
