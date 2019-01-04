import React from 'react'
import { storiesOf } from '@storybook/react'
import Breadcrumbs from 'components/header/breadcrumbs'
import typography from 'utils/typography'
import PropTypes from 'prop-types'

typography.injectStyles()

const sampleBreadcrumbs = JSON.stringify([
  {
    href: '/',
    title: 'CSUMB Home',
  },
  {
    title: 'About CSUMB',
    href: '/about',
  },
])

storiesOf('Breadcrumbs', module).add('Breadcrumb', () => (
  <Breadcrumbs breadcrumbs={sampleBreadcrumbs} />
))
