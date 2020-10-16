import React from 'react'
import styled from '@emotion/styled'
import { ButtonLink } from '../common/button'

const loginUrl =
  'https://csumb.okta.com/home/csumb_csumbbetawebsite_1/0oalhdw605Fe37hnQ0x7/alnlhdyx6zseWNBdS0x7'

const NotLoggedIn = styled('div')`
  font-size: 2rem;
  text-align: center;
  margin: 1rem 0;
`

const DashboardNotLoggedIn = () => (
  <>
    <NotLoggedIn>
      <p>You aren't logged in</p>
      <ButtonLink to={loginUrl} className="button" huge>
        Log in
      </ButtonLink>
    </NotLoggedIn>
    <p>
      <a href="/web/login-issues-safari-internet-explorer">
        Having issues with Safari or Internet Explorer?
      </a>
    </p>
  </>
)

export default DashboardNotLoggedIn
