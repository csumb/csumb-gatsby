import React from 'react'
import SiteHeader from 'components/layouts/sections/header/site-header'
import PageTitle from 'components/layouts/sections/header/page-title'
import Layout from 'components/layouts/default'
import Container from 'components/common/container'

class CourseTemplate extends React.Component {
  render() {
    const { course } = this.props.pageContext
    const pageTitle = `${course.SUBJECT} ${course.CATALOG_NBR}`
    return (
      <Layout pageTitle={pageTitle}>
        <SiteHeader path="/catalog">Catalog</SiteHeader>
        <Container>
          <PageTitle>
            {course.SUBJECT} {course.CATALOG_NBR}: {course.COURSE_TITLE_LONG}
          </PageTitle>
          <>
            <h2>Course description</h2>
            <p>{course.DESCRLONG}</p>
            <p>
              <strong>Units:</strong>
              {course.UNITS_MAXIMUM}
            </p>
          </>
        </Container>
      </Layout>
    )
  }
}

export default CourseTemplate
