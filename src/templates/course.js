import React from 'react'
//import Link from 'gatsby'
import Layout from '../components/layouts/default'
import Container from '../components/container'

class PageTemplate extends React.Component {
  render() {
    const course = this.props.pageContext.course
    const pageTitle = `${course.SUBJECT} ${course.CATALOG_NBR}`
    return (
      <Layout pageTitle={pageTitle}>
        <Container>
          <div>
            <h1>
              {course.SUBJECT} {course.CATALOG_NBR}: {course.COURSE_TITLE_LONG}
            </h1>
            <h2>Course description</h2>
            <p>{course.DESCRLONG}</p>
            <p>
              <strong>Units:</strong>
              {course.UNITS_MAXIMUM}
            </p>
          </div>
        </Container>
      </Layout>
    )
  }
}

export default PageTemplate
