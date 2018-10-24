import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import '../styles/global'
import { css } from 'emotion'
import { Header } from './components/header'
import Footer from './components/footer'
import Helmet from 'react-helmet'
import Shevy from 'shevyjs'
import { ThemeProvider } from 'emotion-theming'
import theme from '../styles/theme'
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav'

const shevy = new Shevy({
  baseFontSize: '18px',
})
const { content } = shevy

class Layout extends React.Component {
  render() {
    let pageTitle = []
    pageTitle.push(
      typeof this.props.pageTitle !== 'undefined' ? this.props.pageTitle : null
    )
    pageTitle.push('Cal State Monterey Bay')
    return (
      <ThemeProvider theme={theme}>
        <div className={css(content)}>
          <SkipNavLink
            className={css`
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
            `}
          />
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
          <div
            className={css`
              clear: both;
            `}
          >
            <SkipNavContent />
            {this.props.children}
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    )
  }
}

export default Layout
