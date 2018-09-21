import React from 'react'
import Logo from '../../../assets/images/csumb-logo-blue.svg'
import { css } from 'emotion'
import Link from 'gatsby-link'
import bp from '../../styles/breakpoints';

const imageClassName = css(bp({
  float: 'left',
  width: ['200px', '350px', '400px', '400px'],
}));

const Header = ({ siteTitle }) => (
  <header>
    <Link to="/">
      <img src={Logo} alt={siteTitle} className={imageClassName}/>
    </Link>
    {siteTitle}
  </header>
)

export default Header
