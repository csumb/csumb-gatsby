import React from 'react'
import styled from 'react-emotion'
import Link from 'gatsby-link'
import { Flex, Box } from '@rebass/grid/emotion'

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

const CourseList = props => (
  <section>
    {props.courses.map(course => (
      <CourseListItem course={course} term={props.term} />
    ))}
  </section>
)

const CourseListItem = props => (
  <Flex>
    <Box width={[1, 1, 1 / 9, 1 / 9]} px={2}>
      {props.course.subject} {props.course.catalog_nbr}
    </Box>
  </Flex>
)

export { ScheduleList, ScheduleListItem, GEList, GEListItem, CourseList }
