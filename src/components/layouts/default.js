import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import Header from 'components/header'
import Footer from 'components/footer'
import Helmet from 'react-helmet'
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav'
import '@reach/skip-nav/styles.css'
import { UserContext, setUserRole } from 'components/contexts/user'
import Emergency from 'components/emergency'
import BreakpointContext from 'components/contexts/breakpoint'
import { ImmortalDB } from 'immortal-db'
import url from 'url'

const mobileBreakpoint = 830

class Layout extends React.Component {
  state = {
    user: false,
    breakpoint: {
      isMobile: false,
      isDesktop: true,
      width: 800,
    },
  }

  async componentDidMount() {
    let that = this

    const setWindowSize = () => {
      that.setState({
        breakpoint: {
          isMobile: window.innerWidth <= mobileBreakpoint,
          isDesktop: window.innerWidth > mobileBreakpoint,
          width: window.innerWidth,
        },
      })
    }

    window.addEventListener('resize', setWindowSize)

    setWindowSize()

    let location = url.parse(window.location.href, true)
    if (location.query && typeof location.query._login !== 'undefined') {
      await ImmortalDB.remove('user')
    }

    const cachedUser = await ImmortalDB.get('user', false)

    if (cachedUser) {
      this.setState({ user: JSON.parse(cachedUser) })
    } else {
      window
        .fetch('https://csumb.okta.com/api/v1/users/me', {
          credentials: 'include',
        })
        .then(response => {
          return response.json()
        })
        .then(user => {
          user = setUserRole(user)
          this.setState({
            user: user,
          })
          ImmortalDB.set('user', user)
        })
        .catch(error => {
          this.setState({
            user: { anonymous: true },
          })
          ImmortalDB.set('user', { anonymous: true })
        })
    }
  }

  render() {
    const { siteNavigation, siteTitle, pageTitle } = this.props

    return (
      <BreakpointContext.Provider value={this.state.breakpoint}>
        <UserContext.Provider value={{ user: this.state.user }}>
          <Emergency />
          <SkipNavLink />
          <Helmet>
            <html lang="en" />
            <meta charset="utf-8" />
            <title>
              {`${pageTitle ? `${pageTitle} |` : ''}
              Cal State Monterey Bay`}
            </title>
          </Helmet>
          <StaticQuery
            query={graphql`
              {
                site {
                  siteMetadata {
                    swiftypeId
                    title
                    okta {
                      login
                    }
                  }
                }
              }
            `}
            render={data => (
              <>
                <Header
                  metadata={data.site.siteMetadata}
                  siteNavigation={siteNavigation}
                  siteTitle={siteTitle}
                />
              </>
            )}
          />
          <SkipNavContent />
          {this.props.children}
          <Footer />
        </UserContext.Provider>
      </BreakpointContext.Provider>
    )
  }
}

export default Layout
