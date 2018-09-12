import React from 'react'
import PropTypes from 'prop-types'
//import Helmet from 'react-helmet'
import { StaticQuery, graphql } from "gatsby"

import Header from '../header'
import '../styles/global'

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
    
      {children}
  </div>
)

Layout.propTypes = {
  children: PropTypes.object,
}

export default Layout
