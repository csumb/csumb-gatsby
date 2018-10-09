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

    return (
      <div>
        <Helmet>
          <title>{typeof this.props.pageTitle !== 'undefined' ? this.props.pageTitle + ' | ' : null}Cal State Monterey Bay</title>
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
          {this.children}
        </Container>
        </div>
        <Footer/>
      </div>
    )
  }
}


export default Layout
