import React, { Component } from 'react'
import Layout from 'components/layouts/default'
import PageTitle from 'components/layouts/sections/header/page-title'
import Container from 'components/common/container'
import { Flex, Box } from '@rebass/grid/emotion'
import moment from 'moment'
import {
  AccountGroup,
  AccountTitle,
  AccountSidebar,
} from 'components/pages/account'
import { UserContext } from 'components/contexts/user'
import Link from 'gatsby-link'
import styled from '@emotion/styled'
import NProgress from 'nprogress'

const getTermName = (term, scheduleFormat) => {
  const names = {
    1: 'Winter',
    2: 'Spring',
    3: 'Summer',
    4: 'Fall',
  }
  term = term.toString().split('')
  if (scheduleFormat) {
    return `${term[0]}0${term[1]}${term[2]}${names[term[3]].toLowerCase()}`
  }
  return `${names[term[3]]} ${term[0]}0${term[1]}${term[2]}`
}

const weekDays = [
  {
    short: 'mon',
    day: 'Monday',
  },
  {
    short: 'tues',
    day: 'Tuesday',
  },
  {
    short: 'wed',
    day: 'Wednesday',
  },
  {
    short: 'thurs',
    day: 'Thursday',
  },
  {
    short: 'fri',
    day: 'Friday',
  },
  {
    short: 'sat',
    day: 'Saturday',
  },
  {
    short: 'sun',
    day: 'Sunday',
  },
]

const CourseMeeting = styled('p')`
  margin-left: 1rem;
`

const CourseHeader = styled('h3')`
  margin-bottom: 0.5rem;
`

class AccountSchedulePage extends Component {
  render() {
    return (
      <Layout pageTitle="Class schedule">
        <UserContext.Consumer>
          {context => (
            <Container>
              {context.user && (
                <>
                  <PageTitle>
                    {context.user.anonymous ? (
                      <h3>Your profile</h3>
                    ) : (
                      <>
                        {context.user.profile.firstName}{' '}
                        {context.user.profile.lastName}
                      </>
                    )}
                  </PageTitle>
                  <Flex flexWrap="wrap">
                    <Box width={[1, 1, 1 / 4, 1 / 4]} px={2}>
                      <AccountSidebar active="schedule" user={context.user} />
                    </Box>
                    <Box width={[1, 1, 3 / 4, 3 / 4]} px={2}>
                      {context.user.anonymous ? (
                        <h3>You must be logged in first.</h3>
                      ) : (
                        <>
                          <AccountTitle>Class schedule</AccountTitle>
                          <ClassScheduleForm user={context.user} />
                        </>
                      )}
                    </Box>
                  </Flex>
                </>
              )}
            </Container>
          )}
        </UserContext.Consumer>
      </Layout>
    )
  }
}

class ClassScheduleForm extends Component {
  componentDidMount() {
    NProgress.start()
    setTimeout(() => {
      NProgress.done()
    }, 3000)
  }

  render() {
    const { user } = this.props
    if (!user.profile.studentEnrollmentDescription) {
      return <p>We could not find any enrolled courses</p>
    }
    const terms = []
    user.profile.studentEnrollmentDescription.forEach(course => {
      course = JSON.parse(course)
      if (typeof terms[course.term_code] === 'undefined') {
        terms[course.term_code] = []
      }
      terms[course.term_code].push(course)
    })
    return (
      <>
        {terms.map((term, termCode) => (
          <AccountGroup legend={getTermName(termCode)}>
            {term.map(course => (
              <ClassScheduleCourse {...course} />
            ))}
          </AccountGroup>
        ))}
      </>
    )
  }
}

class ClassScheduleCourse extends Component {
  state = {
    isReady: false,
    course: false,
  }

  componentDidMount() {
    const { term_code, crn } = this.props
    fetch(`/schedule/json/${term_code}/${crn}.json`)
      .then(response => {
        return response.json()
      })
      .then(course => {
        NProgress.inc()
        course._meetings.map(meeting => {
          meeting._days = []
          weekDays.forEach(day => {
            if (meeting[day.short] === 'Y') {
              meeting._days.push(day.day)
            }
          })
          return meeting
        })
        this.setState({
          isReady: true,
          course: course,
        })
      })
  }

  render() {
    const { isReady, course } = this.state
    const {
      course_subject,
      course_number,
      section_number,
      status_code,
      term_code,
      crn,
    } = this.props
    if (status_code !== 'E') {
      return null
    }
    if (!isReady) {
      return (
        <CourseHeader>
          <Link to={`/schedule/${getTermName(term_code, true)}/${crn}`}>
            {course_subject} {course_number}: {section_number}
          </Link>
        </CourseHeader>
      )
    }
    return (
      <div>
        <CourseHeader>
          <Link to={`/schedule/${getTermName(term_code, true)}/${crn}`}>
            {course.subject} {course.catalog_nbr} ({course.section}):{' '}
            {course.title}
          </Link>
        </CourseHeader>
        {course._meetings.map((meeting, key) => (
          <React.Fragment key={key}>
            {parseInt(meeting.meeting_bldg) < 990 && (
              <CourseMeeting key={key}>
                {meeting._days.map(day => (
                  <span key={day}>{day}, </span>
                ))}
                {moment(meeting.meeting_time_start).format('h:mma')} to{' '}
                {moment(meeting.meeting_time_end).format('h:mma')}
                <br />
                Building {meeting.meeting_bldg.replace(/^0+/, '')}, room{' '}
                {meeting.meeting_rm}
              </CourseMeeting>
            )}
          </React.Fragment>
        ))}
      </div>
    )
  }
}

export default AccountSchedulePage
