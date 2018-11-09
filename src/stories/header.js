import React from 'react'
import { storiesOf } from '@storybook/react'
import Brand from 'components/layouts/components/header/brand'
import Applicant from 'components/layouts/components/header/applicant'
import Header from 'components/layouts/components/header'
import SiteHeader from 'components/layouts/components/site-header'
import {
  NavigationLink,
  NavigationLinkApply,
} from 'components/layouts/components/header/navigation-link'
import typography from 'utils/typography'
import { UserContext } from 'components/contexts/user'

typography.injectStyles()

storiesOf('Header', module)
  .add('About', () => (
    <p>
      The header uses state to change the layout of the design based on screen
      size.
    </p>
  ))
  .add('Complete Header', () => (
    <UserContext.Provider value={{ user: true }}>
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
  ))
  .add('Brand', () => <Brand />)
  .add('Applicant link', () => (
    <UserContext.Provider value={{ user: true }}>
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
