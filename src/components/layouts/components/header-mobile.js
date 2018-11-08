import React from 'react'
import Brand from './brand'
import theme from '../../styles/theme'
import styled from 'react-emotion'
import { MobileNavigationLink } from './navigation-link'
import VisuallyHidden from '@reach/visually-hidden'
import { Flex, Box } from '@rebass/grid/emotion'
import Search from './search'
import { css } from 'react-emotion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons'

const HeaderMobileWrapper = styled('div')`
  padding: 0.5rem 0.25rem;
  border-bottom: 2px solid ${theme.colors.primary.darkest};
`

const mobileButton = css`
  border: 0;
  padding: 0.3rem;
  font-size: 1.8rem;
`

const HeaderMobileToggle = styled('button')`
  ${mobileButton};
`

const HeaderMobileSearchToggle = styled('button')`
  ${mobileButton};
  margin-right: 1.5rem;
`

const HeaderMobileNavigation = styled('ul')`
  margin: 0;
  list-style: none;
  margin-top: 1rem;
  background: ${theme.colors.primary.darkest};
`

const HeaderMobileSearch = styled('div')`
  background: white;
  padding: 0.5rem;
`

const MenuBox = styled(Box)`
  text-align: right;
`

class HeaderMobile extends React.Component {
  state = {
    hasNavigation: false,
    hasSearch: false,
  }

  mobileToggle(event) {
    event.preventDefault()
    this.setState({
      hasNavigation: !this.state.hasNavigation,
    })
  }

  searchToggle(event) {
    event.preventDefault()
    this.setState({
      hasSearch: !this.state.hasSearch,
    })
  }

  /*componentDidUpdate(prevProps, prevState) {
    if (!prevState.hasNavigation && this.state.hasNavigation) {
      this.navRef.focus()
    } else {
      this.navButtonRef.focus()
    }
  }*/

  render() {
    return (
      <header>
        <HeaderMobileWrapper>
          <Flex flexWrap="wrap">
            <Box width={[1 / 2]} px={2}>
              <Brand />
            </Box>
            <MenuBox width={[1 / 2]} px={2}>
              <HeaderMobileSearchToggle
                onClick={this.searchToggle.bind(this)}
                ref={node => {
                  this.searchButtonRef = node
                }}
              >
                <VisuallyHidden>Search</VisuallyHidden>
                <FontAwesomeIcon icon={faSearch} />
              </HeaderMobileSearchToggle>
              <HeaderMobileToggle
                onClick={this.mobileToggle.bind(this)}
                ref={node => {
                  this.navButtonRef = node
                }}
              >
                <FontAwesomeIcon icon={faBars} />
                <VisuallyHidden>Menu</VisuallyHidden>
              </HeaderMobileToggle>
            </MenuBox>
          </Flex>
        </HeaderMobileWrapper>
        {this.state.hasSearch && (
          <HeaderMobileSearch>
            <Search swiftypeId={this.props.swiftypeId} />
          </HeaderMobileSearch>
        )}
        {this.state.hasNavigation && (
          <HeaderMobileNavigation
            tabIndex="-1"
            role="navigation"
            ref={node => {
              this.navRef = node
            }}
          >
            <MobileNavigationLink to="/academics">
              Academics
            </MobileNavigationLink>
            <MobileNavigationLink to="/cost">
              Cost &amp; Aid
            </MobileNavigationLink>
            <MobileNavigationLink to="/about">About</MobileNavigationLink>
          </HeaderMobileNavigation>
        )}
      </header>
    )
  }
}

export default HeaderMobile
