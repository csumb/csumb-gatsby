import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import PageTitle from 'components/layouts/sections/header/page-title'
import typography from 'style/typography'

typography.injectStyles()

storiesOf('Page title', module)
  .add('Plain', () => <PageTitle>The Pequod</PageTitle>)
  .add('With subtitle', () => (
    <PageTitle sub="A true leviathan!">The Whale</PageTitle>
  ))
