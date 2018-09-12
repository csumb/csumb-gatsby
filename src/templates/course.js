import React from 'react'
//import Link from 'gatsby'
import Layout from '../components/layouts/default'

class PageTemplate extends React.Component {

  render() {
    const course = this.props.pageContext.course;
    return (
      <Layout title="{course.SUBJECT} {course.CATALOG_NBR}">
        <div>
          <h1>{course.SUBJECT} {course.CATALOG_NBR}: {course.COURSE_TITLE_LONG}</h1>
          <h2>Course description</h2>
          <p>
            {course.DESCRLONG}
          </p>
          <p>
            <strong>
              Units: 
            </strong>
            {course.UNITS_MAXIMUM}
          </p>
        </div>
      </Layout>
    )
  }
}

export default PageTemplate
