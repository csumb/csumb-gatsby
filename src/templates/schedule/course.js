import React from 'react'
//import Link from 'gatsby-link'
import Layout from 'components/layouts/default'
import Container from 'components/container'
import SiteHeader from 'components/layouts/components/site-header'

class CoursePage extends React.Component {
  render() {
    const term = this.props.pageContext.term
    const course = this.props.pageContext.course
    return (
      <Layout>
        <SiteHeader path="/schedule">Class Schedule</SiteHeader>
        <Container topPadding>
          <h1>{term.DESCR} Schedule</h1>
          <h2>
            {course.SUBJECT} {course.CATALOG_NBR}: {course.TITLE}
          </h2>
          <p>{course.DESCR}</p>
        </Container>
      </Layout>
    )
  }
}

export default CoursePage
