import React from 'react'
import { css } from 'emotion'
import Link from 'gatsby-link'

const Brand = () => (
  <Link to="/" className={css`
      font-weight: bold;
      font-size: 150%;
      color: #000;
      text-decoration: none;
      line-height: 80%;
      &:hover {
        text-decoration: underline;
      }
    `}>
    Cal State<br/>
    Monterey Bay
  </Link>
)

export default Brand