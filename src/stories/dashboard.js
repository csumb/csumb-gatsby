import React from 'react'
import { storiesOf } from '@storybook/react'
import Container from 'components/container'
import {
  DashboardEvent,
  DashboardMessage,
  DashboardAppsWrapper,
  DashboardApp,
} from 'components/pages/dashboard'
import typography from 'utils/typography'

typography.injectStyles()

const sampleMessage = `'The one grand stage where he enacted all his 
various parts so manifold, was his vice-bench; a long rude ponderous 
table furnished with several vices, of different sizes, and both of 
iron and of wood. At all times except when whales were alongside, 
this bench was securely lashed athwartships against the rear of the Try-works.'`

storiesOf('Dashboard', module)
  .add('Apps', () => (
    <DashboardAppsWrapper>
      <Container>
        <DashboardApp
          href="#something"
          target="_blank"
          rel="noopener noreferrer"
        >
          My application
        </DashboardApp>
        <DashboardApp
          href="#something"
          target="_blank"
          rel="noopener noreferrer"
        >
          Another app
        </DashboardApp>
      </Container>
    </DashboardAppsWrapper>
  ))
  .add('Message', () => (
    <DashboardMessage
      message={{
        title: 'The message title',
        message: sampleMessage,
      }}
    />
  ))

  .add('Event', () => (
    <DashboardEvent
      event={{
        headline: 'The event title',
        date: 'March 23, 2018',
        link: '#event',
        description: sampleMessage,
      }}
    />
  ))
