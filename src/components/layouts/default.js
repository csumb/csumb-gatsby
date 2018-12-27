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

class Layout extends React.Component {
  state = {
    user: false,
    breakpoint: {
      isMobile: window.innerWidth <= 768,
      isDesktop: window.innerWidth > 768,
      width: window.innerWidth,
    },
  }

  async componentDidMount() {
    let that = this
    window.addEventListener('resize', () => {
      that.setState({
        breakpoint: {
          isMobile: window.innerWidth <= 768,
          isDesktop: window.innerWidth > 768,
          width: window.innerWidth,
        },
      })
    })

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
    const { siteNavigation } = this.props
    let pageTitle = []
    pageTitle.push(
      typeof this.props.pageTitle !== 'undefined' ? this.props.pageTitle : null
    )
    pageTitle.push('Cal State Monterey Bay')
    return (
      <BreakpointContext.Provider value={this.state.breakpoint}>
        <UserContext.Provider value={{ user: this.state.user }}>
          <Emergency />
          <SkipNavLink />
          <Helmet>
            <html lang="en" />
            <meta charset="utf-8" />
            <title>{pageTitle.join(' | ')}</title>
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
