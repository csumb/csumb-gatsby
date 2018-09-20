import React from 'react'
//import { StaticQuery, graphql } from "gatsby"
import srOnly from '../../styles/sronly'
import colors from '../../styles/colors'
import Link from 'gatsby-link'

import { css } from 'emotion';

const footerStyle = css({
  backgroundColor: colors.tan.light
})

const legalStyle = css({
  backgroundColor: colors.tan.darkest,
  a: {
    color: colors.tan.light,
    fontSize: '0.8rem',
    marginRight: '1rem'
  }
})

const Footer = ({ children, data }) => (
  <footer className={footerStyle}>
    THE FOOTER
    <div className={legalStyle}>
      <Link to="/it/copyright-infringement">Website Copyright/DMCA Policy</Link>
      <Link to="/privacy">Privacy</Link>
      <Link to="/ati">Accessibility</Link>
      <Link to="https://cm.maxient.com/reportingform.php?CSUMontereyBay&amp;layout_id=0">Report concerning behavior</Link>
      <Link to="/titleix">Title <abbr title="nine">IX</abbr></Link>
      <Link to="/diversity">Diversity &amp; Inclusion</Link>
      <Link to="/clery">Security report</Link>
      <Link to="/hr/form-801">Form 801</Link>
      <Link to="/document-reader" className={srOnly}>Some links for may require a Document Reader.</Link>
    </div>
  </footer>
)

export default Footer
