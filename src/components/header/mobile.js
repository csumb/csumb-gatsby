import React from 'react'
import Brand from './brand'
import { colors } from 'components/styles/theme'
import styled from 'react-emotion'
import { MobileNavigationLink } from './navigation-link'
import VisuallyHidden from 'components/visually-hidden'
import { Flex, Box } from '@rebass/grid/emotion'
import Search from './search'
import Container from 'components/container'
import { css } from 'react-emotion'
import UserWidget from './user-widget'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons'

const HeaderMobileWrapper = styled('div')`
  padding: 0.5rem 0.25rem;
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
  padding: 0;
  background: ${colors.primary.darkest};
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
      hasSearch: false
    })
  }

  searchToggle(event) {
    event.preventDefault()
    this.setState({
      hasSearch: !this.state.hasSearch,
      hasNavigation: false
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
    const { hasSearch, hasNavigation } = this.state
    return (
      <header>
        <HeaderMobileWrapper>
          <Flex flexWrap="wrap">
            <Box width={[1 / 2]} px={2}>
              <Brand mobile={true} />
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
        {hasSearch && (
          <HeaderMobileSearch>
            <Search swiftypeId={this.props.swiftypeId} fullWidth />
          </HeaderMobileSearch>
        )}
        {hasNavigation && (
          <>
            <Container>
              <UserWidget />
            </Container>
            <HeaderMobileNavigation
              tabIndex="-1"
              role="navigation"
              ref={node => {
                this.navRef = node
              }}
            >
              <MobileNavigationLink to="/academics">
                Majors &amp; programs
            </MobileNavigationLink>
              <MobileNavigationLink to="/cost">
                Tuition &amp; aid
            </MobileNavigationLink>
              <MobileNavigationLink to="/everything">Everything else</MobileNavigationLink>
              <MobileNavigationLink to="/admissions">Apply</MobileNavigationLink>
            </HeaderMobileNavigation>
          </>
        )}
      </header>
    )
  }
}

export default HeaderMobile
