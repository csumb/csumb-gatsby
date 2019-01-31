import React from 'react'
import { css } from 'emotion'
import Brand from './brand'
import Container from 'components/container'
import Search from './search'
import UserWidget from './user-widget'
import Applicant from './applicant'
import HeaderMobile from './mobile'
import { NavigationLink } from './navigation-link'
import { Flex, Box } from '@rebass/grid'
import styled from 'styled-components'
import BreakpointContext from 'components/contexts/breakpoint'

const HeaderWrapper = styled('header')`
  padding-top: 1rem;
  padding-bottom: 0.7rem;
`

class Header extends React.Component {
  render() {
    const { metadata, siteNavigation, siteTitle } = this.props
    return (
      <BreakpointContext.Consumer>
        {breakpoint => (
          <>
            {breakpoint.isMobile ? (
              <HeaderMobile
                swiftypeId={metadata.swiftypeId}
                siteNavigation={siteNavigation}
                siteTitle={siteTitle}
              />
            ) : (
              <HeaderWrapper>
                <Container>
                  <Flex flexWrap="wrap">
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
                        <Search
                          swiftypeId={metadata.swiftypeId}
                          isMobile={false}
                        />
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
                          <NavigationLink to="/admissions">
                            Admissions
                          </NavigationLink>
                          <NavigationLink to="/cost">
                            Cost &amp; aid
                          </NavigationLink>
                          <NavigationLink to="/academics">
                            Academics
                          </NavigationLink>
                          <NavigationLink to="/life">
                            Campus life
                          </NavigationLink>
                          <NavigationLink to="/everything">
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
  }
}

export default Header
