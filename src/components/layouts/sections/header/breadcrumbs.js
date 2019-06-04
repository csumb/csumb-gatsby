import React from 'react'
import { colors } from 'style/theme'
import Link from 'gatsby-link'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const BreadcrumbItem = styled.li`
  display: inline-block;
  margin-right: 1rem;
  font-size: 80%;
  a {
    color: ${colors.primary.dark};
  }
`

const BreadcrumbList = styled.ul`
  margin: 0;
  padding: 0;
`

const Breadcrumbs = ({ breadcrumbs }) => {
  if (!breadcrumbs.length) {
    return null
  }
  const breadcrumbList = JSON.parse(breadcrumbs)
  return (
    <BreadcrumbList>
      {breadcrumbList.map(crumb => (
        <BreadcrumbItem key={crumb.href}>
          <Link to={crumb.href}>{crumb.title}</Link>
        </BreadcrumbItem>
      ))}
    </BreadcrumbList>
  )
}

Breadcrumbs.propTypes = {
  /** A JSON-string of the page's breadcrumbs */
  breadcrumbs: PropTypes.string.isRequired,
}

export default Breadcrumbs
