import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import '../styles/global'
import { css } from 'emotion'
import Header from './components/header'
import Footer from './components/footer'
import Container from '../container'
import Helmet from 'react-helmet'
import { ThemeProvider } from 'emotion-theming'
import theme from '../styles/theme'

class Layout extends React.Component {
  
  render() {

    return (
      <ThemeProvider theme={theme}>
        <>
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
            {this.props.children}
          </Container>
          </div>
          <Footer/>
        </>
      </ThemeProvider>
    )
  }
}


export default Layout
