import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import Header from 'components/header'
import Footer from 'components/footer/global'
import Helmet from 'react-helmet'
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav'
import '@reach/skip-nav/styles.css'
import Emergency from 'components/emergency'
import FeedbackTab from 'components/feedback-tab'

class Layout extends React.Component {
  render() {
    const { siteNavigation, siteTitle, pageTitle, noFooterMargin } = this.props

    return (
      <>
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
        <Footer noFooterMargin={noFooterMargin ? true : false} />
        <FeedbackTab />
      </>
    )
  }
}

export default Layout
