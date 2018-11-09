import React from 'react'
import { storiesOf } from '@storybook/react'

import typography from 'utils/typography'
import Footer from 'components/layouts/components/footer'

typography.injectStyles()

storiesOf('Footer', module).add('Footer', () => <Footer />)
