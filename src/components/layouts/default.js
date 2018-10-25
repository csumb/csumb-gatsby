import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import '../styles/global'
import { Header } from './components/header'
import Footer from './components/footer'
import Helmet from 'react-helmet'
import Shevy from 'shevyjs'
import theme from '../styles/theme'
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav'
import styled from 'react-emotion'
/*
const shevy = new Shevy({
  baseFontSize: '18px',
  addMarginBottom: false,
})
const { content } = shevy*/

const SkipNavLinkElement = styled(SkipNavLink)`
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  overflow: hidden;
  height: 1px;
  top: 0;
  left: 0;
  background: #fff;
  border: 1px solid #000;
  padding: 1rem;
  display: inline-block;
  :focus {
    overflow: auto;
    clip: auto;
    height: auto;
  }
`

class Layout extends React.Component {
  render() {
    let pageTitle = []
    pageTitle.push(
      typeof this.props.pageTitle !== 'undefined' ? this.props.pageTitle : null
    )
    pageTitle.push('Cal State Monterey Bay')
    return (
      <div>
        <SkipNavLinkElement />
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
