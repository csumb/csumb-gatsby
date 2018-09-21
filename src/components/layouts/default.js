import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from "gatsby"

import '../styles/global'
import { css } from 'emotion'

import Header from './partials/header'
import Footer from './partials/footer'

const Layout = ({ children, data }) => (
  <div>
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
      {children}
    </div>
    <Footer/>
  </div>
)

Layout.propTypes = {
  children: PropTypes.object,
}

export default Layout
