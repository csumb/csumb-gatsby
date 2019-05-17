import React, { Component } from 'react'
import SiteHeader from 'components/layouts/sections/header/site-header'
import PageTitle from 'components/layouts/sections/header/page-title'
import Layout from 'components/layouts/default'
import Container from 'components/common/container'

class CoursePage extends Component {
  state = {
    course: false,
  }
  componentDidMount() {}

  render() {
    const { course } = this.state

    return (
      <Layout pageTitle={pageTitle} siteTitle="Courses">
        <SiteHeader path="/catalog">Catalog</SiteHeader>
        <Container>
          {course && (
            <>
              <PageTitle>
                {course.SUBJECT} {course.CATALOG_NBR}:{' '}
                {course.COURSE_TITLE_LONG}
              </PageTitle>
              <h2>Course description</h2>
              <p>{course.DESCRLONG}</p>
              <p>
                <strong>Units:</strong>
                {course.UNITS_MAXIMUM}
              </p>
            </>
          )}
        </Container>
      </Layout>
    )
  }
}

export default CoursePage
