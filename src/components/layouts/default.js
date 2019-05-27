import React, { Component } from 'react'
import { graphql, StaticQuery } from 'gatsby'
import Header from 'components/layouts/sections/header'
import Footer from 'components/layouts/sections/footer/global'
import Helmet from 'react-helmet'
import styled from '@emotion/styled'
import Pardot from 'components/utilities/pardot'

import Emergency from './alerts/emergency'

const SkipNavLink = styled('a')`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  position: absolute;
  &:focus {
    padding: 1rem;
    position: fixed;
    top: 10px;
    left: 10px;
    background: white;
    z-index: 1;
    width: auto;
    height: auto;
    clip: auto;
  }
`

class Layout extends Component {
  render() {
    const {
      siteNavigation,
      siteTitle,
      pageTitle,
      noFooterMargin,
      isSiteHomepage,
    } = this.props

    return (
      <>
        <Emergency />
        <Pardot />
        <SkipNavLink href="#csumb-skip-nav">Skip to content</SkipNavLink>
        <Helmet>
          <html lang="en" />
          <meta charset="utf-8" />
          <link rel="preconnect" href="https://login.csumb.edu" />
          <title>{`${
            pageTitle ? `${pageTitle} | ` : ''
          }Cal State Monterey Bay`}</title>

          <meta
            className="swiftype"
            name="csumbedu"
            data-type="integer"
            content="1"
          />
          <meta property="og:site_name" content="Cal State Monterey Bay" />
          {pageTitle && (
            <meta
              className="swiftype"
              name="title"
              data-type="string"
              content={pageTitle}
            />
          )}
          {pageTitle && <meta name="twitter:title" content={pageTitle} />}
          {siteTitle && (
            <meta
              className="swiftype"
              name="site_name"
              data-type="string"
              content={siteTitle}
            />
          )}
          <meta
            className="swiftype"
            name="is_site"
            data-type="string"
            content={isSiteHomepage ? '1' : '0'}
          />
          {isSiteHomepage && !siteTitle && (
            <meta
              className="swiftype"
              name="site_name"
              data-type="string"
              content={pageTitle}
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
        <div id="csumb-skip-nav" />
        {this.props.children}
        <Footer noFooterMargin={noFooterMargin ? true : false} />
      </>
    )
  }
}

export default Layout
