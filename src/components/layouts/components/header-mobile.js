import React from 'react'
import Brand from './brand'
import theme from '../../styles/theme'
import styled from 'react-emotion'
import { MobileNavigationLink } from './navigation-link'
import VisuallyHidden from '@reach/visually-hidden'
import { Flex, Box } from '@rebass/grid/emotion'
import Search from './search'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const HeaderMobileWrapper = styled('div')`
  padding: 0.5 0.25rem;
  border-bottom: 2px solid ${theme.colors.primary.darkest};
`

const HeaderMobileToggle = styled('button')`
  border: 3px solid ${theme.colors.primary.darkest};
  padding: 0.3rem;
`

const HeaderMobileSearchToggle = styled('button')`
  border: 3px solid ${theme.colors.muted.bright};
  background: ${theme.colors.muted.bright};
  color: ${theme.colors.primary.darkest};
  padding: 0.3rem;
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
            <Box width={[1 / 3]} px={2}>
              <Brand />
            </Box>
            <MenuBox width={[2 / 3]} px={2}>
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
                Menu
                <VisuallyHidden>Main menu</VisuallyHidden>
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
