import React from 'react'
import Layout from 'components/layouts/default'
import Container from 'components/container'
import SiteHeader from 'components/layouts/components/site-header'
import { CoursePage } from 'components/schedule'

class CoursePageTemplate extends React.Component {
  render() {
    const { term, course } = this.props.pageContext
    return (
      <Layout>
        <SiteHeader path="/schedule">Class Schedule</SiteHeader>
        <Container topPadding>
          <CoursePage term={term} course={course} />
        </Container>
      </Layout>
    )
  }
}

export default CoursePageTemplate
