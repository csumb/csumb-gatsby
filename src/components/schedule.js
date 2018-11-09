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
      <CourseListItemHeader />
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
  const weekDays = [
    {
      short: 'MON',
      day: 'Monday',
    },
    {
      short: 'TUES',
      day: 'Tuesday',
    },
    {
      short: 'WED',
      day: 'Wednesday',
    },
    {
      short: 'THURS',
      day: 'Thursday',
    },
    {
      short: 'FRI',
      day: 'Friday',
    },
    {
      short: 'SAT',
      day: 'Saturday',
    },
    {
      short: 'SUN',
      day: 'Sunday',
    },
  ]

  let meetingDays = []
  weekDays.forEach(day => {
    if (props[day.short] === 'Y') {
      meetingDays.push(day.day)
    }
  })

  const start = moment(props.MEETING_TIME_START)
  const end = moment(props.MEETING_TIME_END)
  return (
    <li>
      {meetingDays.length && meetingDays.join(', ')} {start.format('h:mma')} to{' '}
      {end.format('h:mma')}
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
        <Box width={[1, 1, 1 / 12, 1 / 12]} px={2}>
          <Link to={link}>
            {props.course.SUBJECT} {props.course.CATALOG_NBR}
          </Link>
        </Box>
        <Box width={[1, 1, 3 / 12, 3 / 12]} px={2}>
          <Link to={link}>{props.course.TITLE}</Link>
        </Box>
        <Box width={[1, 1, 1 / 12, 1 / 12]} px={2}>
          {parseInt(props.course.SECTION)}
        </Box>
        <Box width={[1, 1, 1 / 12, 1 / 12]} px={2}>
          {props.course.CRN}
        </Box>
        <Box width={[1, 1, 1 / 12, 1 / 12]} px={2}>
          {props.course.UNITS}
        </Box>
        <Box width={[1, 1, 1 / 12, 1 / 12]} px={2}>
          {props.course.ENRL_TOT}/{props.course.ENRL_MAX}
        </Box>
        <Box width={[1, 1, 3 / 12, 4 / 12]} px={2}>
          {props.course._meetingPattern && (
            <MeetingList>
              {props.course._meetingPattern.map((meeting, key) => (
                <MeetingItem key={key} {...meeting} />
              ))}
            </MeetingList>
          )}
        </Box>
      </Flex>
    </CourseListItemRow>
  )
}

const CourseListItemHeaderFlex = styled(Flex)`
  background: ${theme.colors.primary.darkest};
  color: ${theme.colors.white};
  margin-bottom: 0.5rem;
`

const CourseListItemHeaderBox = styled(Box)`
  padding: 0.5rem;
`

const CourseListItemHeader = () => (
  <CourseListItemHeaderFlex flexWrap="wrap">
    <CourseListItemHeaderBox width={[1, 1, 1 / 12, 1 / 12]} px={2}>
      Course
    </CourseListItemHeaderBox>
    <CourseListItemHeaderBox width={[1, 1, 3 / 12, 3 / 12]} px={2}>
      Title
    </CourseListItemHeaderBox>
    <CourseListItemHeaderBox width={[1, 1, 1 / 12, 1 / 12]} px={2}>
      Section
    </CourseListItemHeaderBox>
    <CourseListItemHeaderBox width={[1, 1, 1 / 12, 1 / 12]} px={2}>
      Number
    </CourseListItemHeaderBox>

    <CourseListItemHeaderBox width={[1, 1, 1 / 12, 1 / 12]} px={2}>
      Units
    </CourseListItemHeaderBox>
    <CourseListItemHeaderBox width={[1, 1, 1 / 12, 1 / 12]} px={2}>
      Seats
    </CourseListItemHeaderBox>
    <CourseListItemHeaderBox width={[1, 1, 3 / 12, 3 / 12]} px={2}>
      Day &amp; time
    </CourseListItemHeaderBox>
  </CourseListItemHeaderFlex>
)

export { ScheduleList, ScheduleListItem, GEList, GEListItem, CourseList }
