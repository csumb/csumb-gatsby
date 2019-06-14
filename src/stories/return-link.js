import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import ReturnLink from '../components/common/return-link'
import typography from 'style/typography'

typography.injectStyles()

storiesOf('Return link', module).add(
  'Return Link',
  () => <ReturnLink to="/">Return to the list of courses</ReturnLink>,
  {
    info: `Used when viewing a page or resource that a user has probably
    reached through a listing or search interface that the user needs to
    get back to.`,
  }
)
