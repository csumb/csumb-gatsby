import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import Header from './components/header'
import Footer from './components/footer'
import Helmet from 'react-helmet'
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav'
import '@reach/skip-nav/styles.css'

class Layout extends React.Component {
  render() {
    let pageTitle = []
    pageTitle.push(
      typeof this.props.pageTitle !== 'undefined' ? this.props.pageTitle : null
    )
    pageTitle.push('Cal State Monterey Bay')
    return (
      <div>
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
      </div>
    )
  }
}

export default Layout
