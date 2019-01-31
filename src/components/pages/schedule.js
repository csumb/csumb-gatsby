import React from 'react'
import styled from '@emotion/styled'
import Link from 'gatsby-link'
import { Flex, Box } from '@rebass/grid'
import { colors } from 'components/styles/theme'
import PageTitle from 'components/header/page-title'
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

const ScheduleListItem = ({ to, children, subject }) => (
  <ScheduleListItemElement>
    <Link to={to}>{subject}</Link>
    {children}
  </ScheduleListItemElement>
)

const GEList = styled('ul')`
  list-style-type: none;
  margin: 0;
`

const GEListItemElement = styled('li')`
  margin-bottom: 0;
`

const GEListItem = ({ to, children }) => (
  <GEListItemElement>
    <Link to={to}>{children}</Link>
  </GEListItemElement>
)

const CourseList = ({ courses, term }) => {
  courses.sort((a, b) => {
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
      {courses.map((course, key) => (
        <CourseListItem key={key} course={course} term={term} />
      ))}
    </section>
  )
}

const CourseListItemRow = styled('div')`
  margin-bottom: 0.7rem;
  padding-bottom: 0.7rem;
  border-bottom: 1px solid ${colors.muted.bright};
`

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
      {props.showLocation && props._building && (
        <>
          <br />
          <Link to={`building/${props._building.code}`}>
            {props._building.buildingName}
          </Link>{' '}
          - Room {props.MEETING_RM}
        </>
      )}
    </li>
  )
}

const CourseListItem = ({ course, term }) => {
  const link = `/schedule/${term.DESCR.toLowerCase().replace(' ', '')}/course/${
    course.CRN
  }`

  return (
    <CourseListItemRow>
      <Flex flexWrap="wrap">
        <Box width={[1, 1, 1 / 12, 1 / 12]} px={2}>
          <Link to={link}>
            {course.SUBJECT} {course.CATALOG_NBR}
          </Link>
        </Box>
        <Box width={[1, 1, 3 / 12, 3 / 12]} px={2}>
          <Link to={link}>{course.TITLE}</Link>
        </Box>
        <Box width={[1, 1, 1 / 12, 1 / 12]} px={2}>
          {parseInt(course.SECTION)}
        </Box>
        <Box width={[1, 1, 1 / 12, 1 / 12]} px={2}>
          {course.CRN}
        </Box>
        <Box width={[1, 1, 1 / 12, 1 / 12]} px={2}>
          {course.UNITS}
        </Box>
        <Box width={[1, 1, 1 / 12, 1 / 12]} px={2}>
          {course.ENRL_TOT}/{course.ENRL_MAX}
        </Box>
        <Box width={[1, 1, 3 / 12, 4 / 12]} px={2}>
          {course._meetingPattern && (
            <MeetingList>
              {course._meetingPattern.map((meeting, key) => (
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
  background: ${colors.primary.darkest};
  color: ${colors.white};
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

const CourseSectionElement = styled('div')``

const CourseSectionLegend = styled('h3')`
  font-size: 1rem;
`

const CourseSection = ({ legend, children }) => (
  <CourseSectionElement>
    <CourseSectionLegend>{legend}</CourseSectionLegend>
    {children}
  </CourseSectionElement>
)

const CourseMeetingList = styled('ul')`
  list-style-type: none;
  margin-left: 0;
`

const EnrollmentList = styled('dl')`
  dt,
  dd {
    display: inline-block;
    width: 50%;
    margin-bottom: 0.3rem;
  }
`

const CourseTitle = styled('h2')`
  margin-top: 0;
`

const CourseNumber = styled('pre')`
  font-size: 1.5rem;
`

const CoursePage = ({ course, term }) => (
  <>
    <PageTitle
      sub={`${course.SUBJECT} ${course.CATALOG_NBR} Section ${
        course.SECTION
      }, ${course.UNITS} units`}
    >
      {term.DESCR}
    </PageTitle>
    <CourseTitle>{course.TITLE}</CourseTitle>
    <Flex flexWrap="wrap">
      <Box width={[1, 1, 1 / 2, 1 / 2]} px={2}>
        <CourseSection legend="Days, times, and locations">
          <CourseMeetingList>
            {course._meetingPattern.map((meeting, key) => (
              <MeetingItem key={key} {...meeting} showLocation />
            ))}
          </CourseMeetingList>
        </CourseSection>
        <CourseSection legend="Enrollment">
          <EnrollmentList>
            <dt>Open seats</dt>
            <dd>{course.ENRL_MAX - course.ENRL_TOT}</dd>
            <dt>Total enrolled</dt>
            <dd>{course.ENRL_TOT}</dd>
            <dt>Maximum enrollment</dt>
            <dd>{course.ENRL_MAX}</dd>
          </EnrollmentList>
        </CourseSection>
      </Box>
      <Box width={[1, 1, 1 / 2, 1 / 2]} px={2}>
        <p>{course.DESCR}</p>
        <CourseSection legend="How to register">
          {course.CONSENT === 'I' && (
            <p>
              To register, you need permission from the instructor.
              <Link to="/permission-codes">
                Learn more about permission codes.
              </Link>
            </p>
          )}
          {course.CONSENT === 'D' && (
            <p>
              To register, you need permission from the department.
              <Link to="/permission-codes">
                Learn more about permission codes.
              </Link>
            </p>
          )}
          <p>
            Use this number to{' '}
            <Link to="/registration-process">
              register for the course in OASIS
            </Link>
            :<CourseNumber>{course.CRN}</CourseNumber>
          </p>
        </CourseSection>
      </Box>
    </Flex>
  </>
)

const ScheduleBackLinkElement = styled(Link)`
  margin-bottom: 1rem;
  display: inline-block;
`

const ScheduleBackLink = ({ term }) => (
  <ScheduleBackLinkElement
    to={`/schedule/${term.DESCR.toLowerCase().replace(' ', '')}`}
  >
    ← Return to {term.DESCR}
  </ScheduleBackLinkElement>
)

export {
  ScheduleList,
  ScheduleListItem,
  GEList,
  GEListItem,
  CourseList,
  CourseSection,
  MeetingItem,
  CoursePage,
  ScheduleBackLink,
}
