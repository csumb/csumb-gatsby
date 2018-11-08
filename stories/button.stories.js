import React from 'react'
import { storiesOf } from '@storybook/react'
import { ButtonLink } from '../src/components/button'

storiesOf('ButtonLink', module)
  .add('with text', () => (
    <ButtonLink to="#here">A simple button that's actually a link</ButtonLink>
  ))
  .add('with emoji', () => <ButtonLink to="#here">👍🤙🏄</ButtonLink>)
