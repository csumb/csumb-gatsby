import React from 'react'
import { css } from 'emotion'
import Brand from './brand'
import Container from 'components/container'
import Search from './search'
import UserWidget from './user-widget'
import HeaderMobile from './header-mobile'
import { ButtonLink } from 'components/button'
import { NavigationLink } from './navigation-link'
import { Flex, Box } from '@rebass/grid/emotion'
import theme from 'components/styles/theme'
import styled from 'react-emotion'

const HeaderWrapper = styled('header')`
  border-bottom: 2px solid ${theme.colors.primary.darkest};
  padding: 1rem 0;
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
    return (
      <>
        {this.state.isMobile ? (
          <HeaderMobile swiftypeId={this.props.metadata.swiftypeId} />
        ) : (
          <HeaderWrapper>
            <Container>
              <Flex flexWrap="wrap">
                <Box width={[1, 1, 1 / 4, 1 / 4]} px={2}>
                  <Brand />
                </Box>
                <Box width={[1, 1, 3 / 4, 3 / 4]} px={2}>
                  <Flex flexWrap="wrap">
                    <Box
                      width={[1, 1, 4 / 5, 4 / 5]}
                      px={2}
                      className={css`
                        text-align: right;
                      `}
                    >
                      <div>
                        <UserWidget
                          loginLink={this.props.metadata.okta.login}
                        />
                        <Search swiftypeId={this.props.metadata.swiftypeId} />
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
                        </ul>
                      </div>
                    </Box>
                    <Box width={[1, 1, 1 / 5, 1 / 5]} px={2}>
                      <ButtonLink to="/apply" buttonType="highImpact">
                        Apply
                      </ButtonLink>
                    </Box>
                  </Flex>
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
