import React from 'react'
import Link from 'gatsby-link'
import { css } from 'emotion'
import Brand from './brand'
import Container from '../../container'
import Search from './search'
import User from './user'
import HeaderMobile from './header-mobile'
import Button from '../../button'
import { NavigationLink } from './navigation-link'
import { Flex, Box } from '@rebass/grid/emotion'
import theme from '../../styles/theme'
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
                        <User loginLink={this.props.metadata.okta.login} />
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
                            Academics
                          </NavigationLink>
                          <NavigationLink to="/cost">
                            Cost &amp; Aid
                          </NavigationLink>
                          <NavigationLink to="/about">About</NavigationLink>
                        </ul>
                      </div>
                    </Box>
                    <Box width={[1, 1, 1 / 5, 1 / 5]} px={2}>
                      <Button to="/apply" buttonType="highImpact">
                        Apply
                      </Button>
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
