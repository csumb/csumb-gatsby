import React from 'react'
import { css } from 'emotion'
import Link from 'gatsby-link'

const NavigationLink = props => (
  <li
    className={css`
      margin-left: 0.5rem;
      display: inline-block;
    `}
  >
    <Link
      to={props.to}
      className={css`
        font-weight: bold;
        text-decoration: none;
        color: #000;
        padding: 0.75rem;
        &:hover {
          background: #000;
          color: #fff;
        }
      `}
    >
      {props.children}
    </Link>
  </li>
)

export default NavigationLink
