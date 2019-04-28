import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import Header from 'components/layouts/sections/header'
import Footer from 'components/layouts/sections/footer/global'
import Helmet from 'react-helmet'
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav'
import '@reach/skip-nav/styles.css'
import Emergency from 'components/emergency'

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
          <title>{`${
            pageTitle ? `${pageTitle} |` : ''
          }Cal State Monterey Bay`}</title>

          <meta
            class="swiftype"
            name="csumbedu"
            data-type="integer"
            content="1"
          />
          <meta property="og:site_name" content="Cal State Monterey Bay" />
          {pageTitle && (
            <meta
              class="swiftype"
              name="title"
              data-type="string"
              content={pageTitle}
            />
          )}
          {pageTitle && <meta name="twitter:title" content={pageTitle} />}
          {siteTitle && (
            <meta
              class="swiftype"
              name="site_name"
              data-type="string"
              content={siteTitle}
            />
          )}
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
      </>
    )
  }
}

export default Layout
