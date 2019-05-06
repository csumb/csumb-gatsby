import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import Breadcrumbs from 'components/layouts/sections/header/breadcrumbs'
import typography from 'style/typography'
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
