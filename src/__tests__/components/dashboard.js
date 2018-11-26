import React from 'react'
import renderer from 'react-test-renderer'
import {
  DashboardEvents,
  DashboardEvent,
  DashboardMessages,
  DashboardMessage,
  DashboardApps,
  DashboardAppsWrapper,
  DashboardApp,
} from 'components/dashboard'

describe('DashboardMessage', () => {
  it('renders messages correctly', () => {
    const tree = renderer
      .create(
        <DashboardMessage
          message={{ title: 'the title', message: 'message' }}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('DashboardEvent', () => {
  it('renders messages correctly', () => {
    const tree = renderer
      .create(
        <DashboardEvent
          event={{
            headline: 'the title',
            dashboard: 'message',
            date: 'October 23, 2018',
            link: '#link',
          }}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
