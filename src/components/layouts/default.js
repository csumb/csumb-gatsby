import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import Header from 'components/layouts/components/header'
import Footer from 'components/layouts/components/footer'
import Helmet from 'react-helmet'
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav'
import '@reach/skip-nav/styles.css'
import { UserContext, setUserRole } from 'components/contexts/user'
import { IronDB } from 'iron-db'
class Layout extends React.Component {
  state = {
    user: false,
  }

  async componentDidMount() {
    const localUser = await IronDB.get('user', false)
    if (localUser) {
      this.setState({
        user: JSON.parse(localUser),
      })
      return
    }
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
        IronDB.set('user', JSON.stringify(user))
      })
      .catch(error => {
        this.setState({
          user: 'anonymous',
        })
        IronDB.set('user', 'anonymous')
      })
  }

  render() {
    let pageTitle = []
    pageTitle.push(
      typeof this.props.pageTitle !== 'undefined' ? this.props.pageTitle : null
    )
    pageTitle.push('Cal State Monterey Bay')
    return (
      <UserContext.Provider value={this.state}>
        <SkipNavLink />
        <Helmet>
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
              <Header metadata={data.site.siteMetadata} />
            </>
          )}
        />
        <SkipNavContent />
        {this.props.children}
        <Footer />
      </UserContext.Provider>
    )
  }
}

export default Layout
