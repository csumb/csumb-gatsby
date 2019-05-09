import React, { Component } from 'react'
import Layout from 'components/layouts/default'
import Container from 'components/common/container'
import SiteHeader from 'components/layouts/sections/header/site-header'
import { CoursePage } from 'components/pages/schedule'

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
