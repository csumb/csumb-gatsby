import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import '../styles/global'
import { css } from 'emotion'
import Header from './components/header'
import Footer from './components/footer'
import Container from '../container'
import Helmet from 'react-helmet'

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
      <div>
        <html lang="en"/>
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
        <Container>
          {this.props.children}
        </Container>
        </div>
        <Footer/>
      </div>
    )
  }
}


export default Layout
