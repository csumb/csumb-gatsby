import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button, ButtonLink, LinkyButton } from 'components/button'
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
  .add('Huge', () => (
    <ButtonLink to="#here" buttonType="primary" huge>
      A huge button
    </ButtonLink>
  ))
  .add('ExtraMargin', () => (
    <ButtonLink to="#here" buttonType="primary" extraMargin>
      I have some extra vertical margins
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
  .add('Huge', () => (
    <Button to="#here" buttonType="primary" huge>
      A huge button
    </Button>
  ))
  .add('ExtraMargin', () => (
    <Button to="#here" buttonType="primary" extraMargin>
      I have some extra vertical margins
    </Button>
  ))

storiesOf('Linky Button', module).add(
  'Default',
  () => <LinkyButton>I look like a link!</LinkyButton>,
  {
    info:
      'Use when a button is an appropriate element, but you want it to look visually like a link.',
  }
)
