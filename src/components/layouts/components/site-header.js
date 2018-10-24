import React from 'react'
import { css } from 'emotion'
import Link from 'gatsby-link'
import Container from '../../container'

export default props => (
  <div
    className={css`
      background: #000;
      padding: 0.5rem 0;
      h2 {
        margin: 0;
      }
      a {
        color: #fff;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    `}
  >
    <Container>
      <h2>
        <Link to={props.path}>{props.title}</Link>
      </h2>
    </Container>
  </div>
)
