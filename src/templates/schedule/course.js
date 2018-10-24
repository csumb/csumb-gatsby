import React from 'react'
//import Link from 'gatsby-link'
import Layout from '../../components/layouts/default'

class CoursePage extends React.Component {
  render() {
    const term = this.props.pageContext.term
    const course = this.props.pageContext.course
    return (
      <Layout>
        <h1>{term.DESCR} Schedule</h1>
        <h2>
          {course.SUBJECT} {course.CATALOG_NBR}: {course.TITLE}
        </h2>
        <p>{course.DESCR}</p>
      </Layout>
    )
  }
}

export default CoursePage
