import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import Header from 'components/header'
import Footer from 'components/footer/global'
import Helmet from 'react-helmet'
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav'
import '@reach/skip-nav/styles.css'
import { UserContext, setUserRole } from 'components/contexts/user'
import Emergency from 'components/emergency'
import { ImmortalDB } from 'immortal-db'
import url from 'url'

class Layout extends React.Component {
  state = {
    user: false,
  }

  async componentDidMount() {
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
    const { siteNavigation, siteTitle, pageTitle, hasSiteFooter } = this.props

    return (
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
        <Footer hasSiteFooter={hasSiteFooter ? true : false} />
      </UserContext.Provider>
    )
  }
}

export default Layout
