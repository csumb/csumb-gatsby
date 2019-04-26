import React from 'react'
import { storiesOf } from '@storybook/react'

import typography from 'style/typography'
import Loading from 'components/common/loading'

typography.injectStyles()

storiesOf('Loading', module).add('Loading', () => (
  <Loading>Loading your data</Loading>
))
