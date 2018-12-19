import React from 'react'
import { css } from 'emotion'
import Brand from './brand'
import Container from 'components/container'
import Search from './search'
import UserWidget from './user-widget'
import Applicant from './applicant'
import HeaderMobile from './header-mobile'
import { NavigationLink, NavigationLinkApply } from './navigation-link'
import { Flex, Box } from '@rebass/grid/emotion'
import styled from 'react-emotion'

const HeaderWrapper = styled('header')`
  padding-top: 1rem;
  padding-bottom: 0.7rem;
`

class Header extends React.Component {
  state = {
    isMobile: typeof window !== 'undefined' ? window.innerWidth < 700 : false,
  }

  componentDidMount() {
    let that = this
    window.addEventListener('resize', () => {
      that.setState({
        isMobile: window.innerWidth < 700,
      })
    })
  }

  render() {
    const { isMobile } = this.state
    const { metadata } = this.props
    return (
      <>
        {isMobile ? (
          <HeaderMobile swiftypeId={metadata.swiftypeId} />
        ) : (
            <HeaderWrapper>
              <Container>
                <Flex flexWrap="wrap">
                  <Box width={[1, 1, 1 / 3, 1 / 3]} px={2}>
                    <Brand />
                  </Box>
                  <Box
                    width={[1, 1, 2 / 3, 2 / 3]}
                    px={2}
                    className={css`
                    text-align: right;
                  `}
                  >
                    <div>
                      <Applicant />
                      <UserWidget loginLink={metadata.okta.login} />
                      <Search swiftypeId={metadata.swiftypeId} />
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
                        <NavigationLink to="/academics">
                          Majors &amp; Programs
                        </NavigationLink>
                        <NavigationLink to="/cost">
                          Tuition &amp; Aid
                        </NavigationLink>
                        <NavigationLink to="/map">Map</NavigationLink>
                        <NavigationLink to="/about">About</NavigationLink>
                        <NavigationLinkApply to="/apply">
                          Apply
                      </NavigationLinkApply>
                      </ul>
                    </div>
                  </Box>
                </Flex>
              </Container>
            </HeaderWrapper>
          )}
      </>
    )
  }
}

export default Header
