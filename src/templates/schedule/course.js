import React from 'react'
import Link from 'gatsby-link'
import Layout from 'components/layouts/default'
import Container from 'components/container'
import SiteHeader from 'components/layouts/components/site-header'
import PageTitle from 'components/page-title'
import { CourseSection, MeetingItem } from 'components/schedule'
import { Flex, Box } from '@rebass/grid/emotion'
import styled from 'react-emotion'

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
class CoursePage extends React.Component {
  render() {
    const { term, course } = this.props.pageContext
    return (
      <Layout>
        <SiteHeader path="/schedule">Class Schedule</SiteHeader>
        <Container topPadding>
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
            </Box>
          </Flex>
        </Container>
      </Layout>
    )
  }
}

export default CoursePage
