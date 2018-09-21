import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from "gatsby"

import '../styles/global'
import { css } from 'emotion'
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './partials/header'
import Footer from './partials/footer'
import Container from '../container'

const Layout = ({ children, data }) => (
  <div>
    <CssBaseline />
    <StaticQuery
      query={graphql`{
          site {
            siteMetadata {
              title
            }
          }
        }`}
        render={data => (
               <>
               <Header siteTitle={data.site.siteMetadata.title} />
               
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

Layout.propTypes = {
  children: PropTypes.object,
}

export default Layout
