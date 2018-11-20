import React from 'react'
import { storiesOf } from '@storybook/react'

import typography from 'utils/typography'
import Loading from 'components/loading'

typography.injectStyles()

storiesOf('Loading', module).add('Loading', () => (
  <Loading>Loading your data</Loading>
))
