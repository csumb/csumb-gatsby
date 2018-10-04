import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import '../styles/global'
import { css } from 'emotion'
import Header from './partials/header'
import Footer from './partials/footer'
import Container from '../container'

const Layout = ({ children, data }) => (
  <div>
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
      {children}
    </Container>
    </div>
    <Footer/>
  </div>
)

export default Layout
