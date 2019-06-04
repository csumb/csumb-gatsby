import React, { Component } from 'react'
import Layout from 'components/layouts/default'
import PageTitle from 'components/layouts/sections/header/page-title'
import Container from 'components/common/container'
import { Flex, Box } from 'components/common/grid'
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

const CourseHeader = styled.h3`
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
                  <Flex>
                    <Box width={[1, 1 / 4]} pr={[0, 4]}>
                      <AccountSidebar active="schedule" user={context.user} />
                    </Box>
                    <Box width={[1, 3 / 4]}>
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

const ClassScheduleCourse = ({
  course_subject,
  course_number,
  section_number,
  term_code,
  crn,
}) => (
  <CourseHeader>
    <Link to={`/schedule/${getTermName(term_code, true)}/${crn}`}>
      {course_subject} {course_number}: {section_number}
    </Link>
  </CourseHeader>
)

export default AccountSchedulePage
