import React, { Component } from 'react'
import { Layout, SiteHeader } from '../../components/layouts/default'
import Container from '../../components/common/container'
import { CoursePage } from '../../components/schedule'

class CoursePageTemplate extends Component {
  render() {
    const { term, course, requirements } = this.props.pageContext
    return (
      <Layout
        pageTitle={`${course.SUBJECT} ${course.CATALOG_NBR} Section ${
          course.SECTION
        } - ${term.DESCR}`}
        siteTitle="Class Schedule"
      >
        <SiteHeader path="/schedule">Class Schedule</SiteHeader>
        <Container topPadding>
          <CoursePage term={term} course={course} requirements={requirements} />
        </Container>
      </Layout>
    )
  }
}

export default CoursePageTemplate
