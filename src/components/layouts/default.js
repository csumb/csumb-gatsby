import React, { Component } from 'react'
import { graphql, StaticQuery } from 'gatsby'
import Header from './sections/header'
import Footer from './sections/footer/global'
import Helmet from 'react-helmet'
import styled from '@emotion/styled'
import Pardot from '../utilities/pardot'
import IFrameRedirect from '../utilities/iframe-redirect'
import PageTitle from './sections/header/page-title'
import SiteNavigation from './sections/navigation/site'
import PageNavigation from './sections/navigation/page'
import SiteHeader from './sections/header/site-header'
import Emergency from './alerts/emergency'
import SiteImprove from '../utilities/siteimprove'

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
        <SkipNavLink href="#csumb-skip-nav" data-swiftype-index="false">
          Skip to content
        </SkipNavLink>
        <Helmet>
          <html lang="en" />
          <meta charset="utf-8" />
          <link rel="preconnect" href="https://csumb.okta.com" crossorigin />
          <title>{`${
            pageTitle ? `${pageTitle} | ` : ''
          }Cal State Monterey Bay`}</title>
          {pageTitle === 'Homepage' && (
            <meta
              name="description"
              content="CSUMB is one of the most affordable universities.
               Students enjoy living and studying just one mile from the beach!"
            />
          )}
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
            data-type="integer"
            content={isSiteHomepage ? '1' : '0'}
            data-react-helmet="true"
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
        <div data-swiftype-index="true">{this.props.children}</div>
        <Footer noFooterMargin={noFooterMargin ? true : false} />
        <Emergency />
        <IFrameRedirect />
        <Pardot />
        <SiteImprove />
      </>
    )
  }
}

export { Layout, PageTitle, PageNavigation, SiteNavigation, SiteHeader }
