import React from 'react'
import styled from 'react-emotion'
import Link from 'gatsby-link'

const ScheduleList = styled('ul')`
  list-style-type: none;
  margin: 0;
`

const ScheduleListItemElement = styled('li')`
  margin-bottom: 0;
  a {
    font-weight: bold;
    display: inline-block;
    margin-right: 0.5rem;
  }
`

const ScheduleListItem = props => (
  <ScheduleListItemElement>
    <Link to={props.to}>{props.subject}</Link>
    {props.children}
  </ScheduleListItemElement>
)

const GEList = styled('ul')`
  list-style-type: none;
  margin: 0;
`

const GEListItemElement = styled('li')`
  margin-bottom: 0;
`

const GEListItem = props => (
  <GEListItemElement>
    <Link to={props.to}>{props.children}</Link>
  </GEListItemElement>
)

export { ScheduleList, ScheduleListItem, GEList, GEListItem }
