import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import '../styles/global'
import { css } from 'emotion'
import Header from './components/header'
import Footer from './components/footer'
import Helmet from 'react-helmet'
import Shevy from 'shevyjs'

const shevy = new Shevy({
  baseFontSize: '18px'
})
const { content } = shevy

class Layout extends React.Component {
  
  render() {
    let pageTitle = []
    pageTitle.push(
      (typeof this.props.pageTitle !== 'undefined') ?
        this.props.pageTitle :
        null
    )
    pageTitle.push('Cal State Monterey Bay')
    return (
      <div className={css(content)}>
        <Helmet>
          <title>{pageTitle.join(' | ')}</title>
        </Helmet>
        <StaticQuery
          query={graphql`{
              site {
                siteMetadata {
                  swiftypeId
                  title
                  okta {
                    login
                  }
                }
              }
            }`}
            render={data => (
                  <>
                  <Header metadata={data.site.siteMetadata}/>
                  
                  </>
                  )}
        />
        <div className={css`
        clear: both 
        `}>
        {this.props.children}
        </div>
        <Footer/>
      </div>
    )
  }
}


export default Layout
