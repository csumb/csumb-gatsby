import React from 'react'
import { css } from 'emotion'
import Link from 'gatsby-link'
import styled from 'react-emotion'

const BreadcrumbItem = styled('li')`
  display: inline-block;
  margin-right: 1rem;
  font-size: 80%;
  a {
    color: ${props => props.theme.colors.blue.dark};
  }
`

const Breadcrumbs = (props) => {
  if(!props.breadcrumbs.length) {
    return null
  }
  const breadcrumbs = JSON.parse(props.breadcrumbs)
  return (
    <ul className={css`
      margin: 0;
      padding: 0;
    `}>
      {breadcrumbs.map(crumb => (
        <BreadcrumbItem key={crumb.href}>
          <Link to={crumb.href}>{crumb.title}</Link>
        </BreadcrumbItem>
      ))}
    </ul>
  )
}

export default Breadcrumbs