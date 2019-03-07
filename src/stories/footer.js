import React from 'react'
import { storiesOf } from '@storybook/react'

import typography from 'style/typography'
import Footer from 'components/footer/global'

typography.injectStyles()

storiesOf('Footer', module).add('Footer', () => <Footer />)
