import React from 'react'
import { css } from 'emotion'
import Brand from './brand'
import Container from 'components/common/container'
import Search from './search'
import UserWidget from './user-widget'
import Applicant from './applicant'
import HeaderMobile from './mobile'
import { NavigationLink } from './navigation-link'
import { Flex, Box } from 'components/common/grid'
import styled from '@emotion/styled'
import bp from 'style/breakpoints'
import BreakpointContext from 'components/contexts/breakpoint'

const HeaderWrapper = styled('header')`
  padding-top: 0.75rem;
  @media print {
    display: none;
  }
  ${bp({
    display: ['none', 'block'],
  })}
`

const Header = ({ metadata, siteNavigation, siteTitle }) => (
  <BreakpointContext.Consumer>
    {({ isMobile }) => (
      <>
        {isMobile ? (
          <HeaderMobile
            siteNavigation={siteNavigation}
            loginLink={metadata.okta.login}
            siteTitle={siteTitle}
          />
        ) : (
          <HeaderWrapper data-swiftype-index="false">
            <Container>
              <Flex>
                <Box width={[1, 1, 1 / 3, 1 / 3]} pr={2}>
                  <Brand />
                </Box>
                <Box
                  width={[1, 1, 2 / 3, 2 / 3]}
                  pl={2}
                  className={css`
                    text-align: right;
                  `}
                >
                  <div>
                    <Applicant />
                    <UserWidget loginLink={metadata.okta.login} />
                    <Search isMobile={false} />
                  </div>
                  <div
                    className={css`
                      margin-top: 1rem;
                    `}
                  >
                    <ul
                      className={css`
                        margin: 0;
                        list-style: none;
                      `}
                    >
                      <NavigationLink to="/about">About</NavigationLink>
                      <NavigationLink to="/admissions">Apply</NavigationLink>
                      <NavigationLink to="/cost">Cost &amp; aid</NavigationLink>
                      <NavigationLink to="/academics">Academics</NavigationLink>
                      <NavigationLink to="/life">Campus life</NavigationLink>
                      <NavigationLink to="/alumni">Alumni</NavigationLink>
                      <NavigationLink to="/everything" last={true}>
                        Everything else
                      </NavigationLink>
                    </ul>
                  </div>
                </Box>
              </Flex>
            </Container>
          </HeaderWrapper>
        )}
      </>
    )}
  </BreakpointContext.Consumer>
)

export default Header
