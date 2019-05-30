import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import Brand from 'components/layouts/sections/header/brand'
import Applicant from 'components/layouts/sections/header/applicant'
import Header from 'components/layouts/sections/header'
import SiteHeader from 'components/layouts/sections/header/site-header'
import { NavigationLink } from 'components/layouts/sections/header/navigation-link'
import typography from 'style/typography'
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
            swiftypeId: process.env.GATSBY_CSUMB_SWIFTYPE_ID,
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
  .add('Site header', () => (
    <SiteHeader path="/it">Information Technology</SiteHeader>
  ))
