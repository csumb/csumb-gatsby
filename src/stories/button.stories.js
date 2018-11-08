import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button, ButtonLink } from 'components/button'
import typography from 'utils/typography'

typography.injectStyles()

storiesOf('ButtonLink', module)
  .add('default', () => <ButtonLink to="#here">A button</ButtonLink>)
  .add('primary', () => (
    <ButtonLink to="#here" buttonType="primary">
      A primary button
    </ButtonLink>
  ))
  .add('highImpact', () => (
    <ButtonLink to="#here" buttonType="highImpact">
      High impact
    </ButtonLink>
  ))

storiesOf('Button', module).add('default', () => (
  <Button>A native button</Button>
))
