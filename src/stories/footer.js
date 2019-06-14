import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'

import typography from 'style/typography'
import Footer from '../components/layouts/sections/footer/global'

typography.injectStyles()

storiesOf('Footer', module).add('Footer', () => <Footer />)
