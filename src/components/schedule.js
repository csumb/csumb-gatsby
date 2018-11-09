import React from 'react'
import styled from 'react-emotion'
import Link from 'gatsby-link'
import { Flex, Box } from '@rebass/grid/emotion'
import theme from 'components/styles/theme'
import moment from 'moment'

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

const CourseList = props => {
  props.courses.sort((a, b) => {
    if (a.CATALOG_NBR === b.CATALOG_NBR && a.SECTION > b.SECTION) {
      return 1
    }
    if (a.CATALOG_NBR === b.CATALOG_NBR && a.SECTION < b.SECTION) {
      return -1
    }
    if (a.CATALOG_NBR > b.CATALOG_NBR) {
      return 1
    }
    if (a.SECTION > b.SECTION) {
      return 1
    }
    return -1
  })

  return (
    <section>
      {props.courses.map((course, key) => (
        <CourseListItem key={key} course={course} term={props.term} />
      ))}
    </section>
  )
}

const CourseListItemRow = styled('div')`
  margin-bottom: 0.7rem;
  padding-bottom: 0.7rem;
  border-bottom: 1px solid ${theme.colors.muted.bright};
`

const processTime = time => {
  return time.replace('1900-01-01 ', '').replace(':00.0', '')
}

const MeetingList = styled('ul')`
  list-style-type: none;
  margin: 0;
  font-size: 80%;
`

const MeetingItem = props => {
  const start = moment(props.MEETING_TIME_START)
  const end = moment(props.MEETING_TIME_END)
  return (
    <li>
      {props.MON === 'Y' && <>Monday </>}
      {props.TUES === 'Y' && <>Tuesday </>}
      {props.WED === 'Y' && <>Wednesday </>}
      {props.THURS === 'Y' && <>Thursday </>}
      {props.FRI === 'Y' && <>Friday </>}
      {props.SAT === 'Y' && <>Saturday </>}
      {props.SUN === 'Y' && <>Sunday </>}
      {start.format('h:mma')} to {end.format('h:mma')}
    </li>
  )
}

const CourseListItem = props => {
  const link = `/schedule/${props.term.DESCR.toLowerCase().replace(
    ' ',
    ''
  )}/course/${props.course.CRN}`

  return (
    <CourseListItemRow>
      <Flex flexWrap="wrap">
        <Box width={[1, 1, 1 / 10, 1 / 10]} px={2}>
          <Link to={link}>
            {props.course.SUBJECT} {props.course.CATALOG_NBR} -{' '}
            {parseInt(props.course.SECTION)}
          </Link>
        </Box>
        <Box width={[1, 1, 3 / 10, 3 / 10]} px={2}>
          <Link to={link}>{props.course.TITLE}</Link>
        </Box>
        <Box width={[1, 1, 1 / 10, 1 / 10]} px={2}>
          {props.course.CRN}
        </Box>
        <Box width={[1, 1, 1 / 10, 1 / 10]} px={2}>
          {props.course.UNITS}
        </Box>
        <Box width={[1, 1, 1 / 10, 1 / 10]} px={2}>
          {props.course.ENRL_TOT}/{props.course.ENRL_MAX}
        </Box>
        <Box width={[1, 1, 3 / 10, 3 / 10]} px={2}>
          {props.course._meetingPattern && (
            <MeetingList>
              {props.course._meetingPattern.map(meeting => (
                <MeetingItem {...meeting} />
              ))}
            </MeetingList>
          )}
        </Box>
      </Flex>
    </CourseListItemRow>
  )
}

export { ScheduleList, ScheduleListItem, GEList, GEListItem, CourseList }
