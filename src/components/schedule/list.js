import React from 'react'
import styled from '@emotion/styled'
import Link from 'gatsby-link'

const ScheduleListItemElement = styled('li')`
  margin-bottom: 0.5rem;
  a {
    font-weight: bold;
    display: inline-block;
    margin-right: 0.5rem;
  }
`

const ScheduleListItem = ({ to, children, subject }) => (
  <ScheduleListItemElement>
    <Link to={to}>{subject}</Link>
    {children}
  </ScheduleListItemElement>
)

export default ScheduleListItem
