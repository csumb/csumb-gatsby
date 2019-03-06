import React from 'react'
import { storiesOf } from '@storybook/react'

import typography from 'style/typography'
import Well from 'components/well'

typography.injectStyles()

storiesOf('Well', module).add(
  'Well',
  () => (
    <Well>
      <h3>The story of the Pequod</h3>
      <p>
        Such was the thunder of his voice, that spite of their amazement the men
        sprang over the rail; the sheaves whirled round in the blocks; with a
        wallow, the three boats dropped into the sea; while, with a dexterous,
        off-handed daring, unknown in any other vocation, the sailors,
        goat-like, leaped down the rolling ship’s side into the tossed boats
        below.
      </p>
    </Well>
  ),
  {
    info: 'Wells are used to group shared componnets together',
  }
)
