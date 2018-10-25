import React from 'react'
import theme from './styles/theme'
import Link from 'gatsby-link'
import styled from 'react-emotion'

const BreadcrumbItem = styled('li')`
  display: inline-block;
  margin-right: 1rem;
  font-size: 80%;
  a {
    color: ${theme.colors.primary.dark};
  }
`

const BreadcrumbList = styled('ul')`
  margin: 0;
  padding: 0;
`

const Breadcrumbs = props => {
  if (!props.breadcrumbs.length) {
    return null
  }
  const breadcrumbs = JSON.parse(props.breadcrumbs)
  return (
    <BreadcrumbList>
      {breadcrumbs.map(crumb => (
        <BreadcrumbItem key={crumb.href}>
          <Link to={crumb.href}>{crumb.title}</Link>
        </BreadcrumbItem>
      ))}
    </BreadcrumbList>
  )
}

export default Breadcrumbs
