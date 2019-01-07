import React from 'react'
import { storiesOf } from '@storybook/react'
import Brand from 'components/header/brand'
import Applicant from 'components/header/applicant'
import Header from 'components/header'
import SiteHeader from 'components/header/site-header'
import {
  NavigationLink,
  NavigationLinkApply,
} from 'components/header/navigation-link'
import typography from 'utils/typography'
import { UserContext } from 'components/contexts/user'

typography.injectStyles()

const sampleUser = {
  profile: {
    login: 'otter@csumb.edu',
  },
}
storiesOf('Header', module)
  .add(
    'Complete Header',
    () => (
      <UserContext.Provider value={{ user: sampleUser }}>
        <Header
          metadata={{
            title: `Cal State Monterey Bay`,
            okta: {
              login: `https://csumb.okta.com`,
            },
            swiftypeId: `Gu7FdGTPV49T6dsYVBSV`,
          }}
        />
      </UserContext.Provider>
    ),
    {
      info:
        'The header uses state to change the layout of the design based on screen size.',
    }
  )
  .add('Brand', () => <Brand />)
  .add('Applicant link', () => (
    <UserContext.Provider value={{ user: trsampleUserue }}>
      <Applicant />
    </UserContext.Provider>
  ))
  .add('Navigation Link', () => (
    <NavigationLink to="/about">About</NavigationLink>
  ))
  .add('Apply Navigation Link', () => (
    <NavigationLinkApply to="/apply">Apply</NavigationLinkApply>
  ))
  .add('Site header', () => (
    <SiteHeader path="/it">Information Technology</SiteHeader>
  ))
