import React from 'react'
import { storiesOf } from '@storybook/react'

import typography from 'utils/typography'
import {
  AlertDanger,
  AlertInfo,
  AlertWarning,
  AlertEmpty,
} from 'components/alert'

typography.injectStyles()

const alertInfo = {
  info: `Just styled versions of [reach ui's alerts](https://ui.reach.tech/alert). Make sure to always set a \`type\` prop of either "polite" or "assertive".`,
}

storiesOf('Alerts', module)
  .add(
    'Danger',
    () => (
      <AlertDanger type="polite">
        <p>
          Besides, it has been divined by other continental commentators, that
          when Jonah was thrown overboard from the Joppa ship, he straightway
          effected his escape to another vessel near by
        </p>
      </AlertDanger>
    ),
    alertInfo
  )
  .add(
    'Warning',
    () => (
      <AlertWarning type="polite">
        <p>
          Besides, it has been divined by other continental commentators, that
          when Jonah was thrown overboard from the Joppa ship, he straightway
          effected his escape to another vessel near by
        </p>
      </AlertWarning>
    ),
    alertInfo
  )
  .add(
    'Info',
    () => (
      <AlertInfo type="polite">
        <p>
          Besides, it has been divined by other continental commentators, that
          when Jonah was thrown overboard from the Joppa ship, he straightway
          effected his escape to another vessel near by
        </p>
      </AlertInfo>
    ),
    alertInfo
  )
  .add(
    'Empty',
    () => (
      <AlertEmpty type="polite">
        <p>
          Besides, it has been divined by other continental commentators, that
          when Jonah was thrown overboard from the Joppa ship, he straightway
          effected his escape to another vessel near by
        </p>
      </AlertEmpty>
    ),
    {
      info: 'Use for when there are no search results, messages, events, etc.',
    }
  )
