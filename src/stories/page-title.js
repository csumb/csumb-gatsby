import React from 'react'
import { storiesOf } from '@storybook/react'
import PageTitle from 'components/page-title'
import typography from 'utils/typography'

typography.injectStyles()

storiesOf('Page title', module).add('Page title', () => (
  <PageTitle>The Pequod</PageTitle>
))
