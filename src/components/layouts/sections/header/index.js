import React from 'react'
import HeaderMobile from './mobile'
import HeaderDesktop from './desktop'
import styled from '@emotion/styled'
import { bp } from '../../../../style'

const HeaderWrapper = styled.header`
  @media print {
    display: none;
  }
`

const HeaderBreakpointDesktop = styled.div`
  ${bp({
    display: ['none', 'none', 'block'],
  })}
`
const HeaderBreakpointMobile = styled.div`
  ${bp({
    display: ['block', 'block', 'none'],
  })}
`

const Header = ({ metadata, siteNavigation, siteTitle }) => (
  <HeaderWrapper data-swiftype-index="false">
    <HeaderBreakpointMobile>
      <HeaderMobile
        siteNavigation={siteNavigation}
        loginLink={metadata.okta.login}
        siteTitle={siteTitle}
      />
    </HeaderBreakpointMobile>
    <HeaderBreakpointDesktop>
      <HeaderDesktop
        siteNavigation={siteNavigation}
        loginLink={metadata.okta.login}
        siteTitle={siteTitle}
      />
    </HeaderBreakpointDesktop>
  </HeaderWrapper>
)

export default Header
