import React from 'react'
import { storiesOf } from '@storybook/react'

import typography from 'utils/typography'
import { AlertDanger, AlertInfo, AlertWarning } from 'components/alert'

typography.injectStyles()

storiesOf('Alerts', module)
  .add('Danger', () => (
    <AlertDanger type="polite">
      <p>
        Besides, it has been divined by other continental commentators, that
        when Jonah was thrown overboard from the Joppa ship, he straightway
        effected his escape to another vessel near by
      </p>
    </AlertDanger>
  ))
  .add('Warning', () => (
    <AlertWarning type="polite">
      <p>
        Besides, it has been divined by other continental commentators, that
        when Jonah was thrown overboard from the Joppa ship, he straightway
        effected his escape to another vessel near by
      </p>
    </AlertWarning>
  ))
  .add('Info', () => (
    <AlertInfo type="polite">
      <p>
        Besides, it has been divined by other continental commentators, that
        when Jonah was thrown overboard from the Joppa ship, he straightway
        effected his escape to another vessel near by
      </p>
    </AlertInfo>
  ))
