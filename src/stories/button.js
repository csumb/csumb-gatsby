import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button, ButtonLink } from 'components/button'
import typography from 'utils/typography'

typography.injectStyles()

storiesOf('ButtonLink', module)
  .add('Default', () => <ButtonLink to="#here">A button</ButtonLink>, {
    info: `Button links are used for making a link to a page that evokes the feeling
    of an action. Do not use button links to invoke Javascript or do something
    that changes the state of the current page, use a regular button insted.`,
  })
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
  .add('Default', () => <Button>A native button</Button>, {
    info: `While styled the same as Button Links, buttons are for in-page actions,
    like popping open a modal or changing a value.`,
  })
  .add('Primary', () => <Button buttonType="primary">A primary button</Button>)
  .add('High Impact', () => (
    <Button buttonType="highImpact">High impact</Button>
  ))
