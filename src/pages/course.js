import React, { Component } from 'react'
import SiteHeader from 'components/layouts/sections/header/site-header'
import PageTitle from 'components/layouts/sections/header/page-title'
import Layout from 'components/layouts/default'
import Container from 'components/common/container'
import url from 'url'

class CoursePage extends Component {
  state = {
    course: false,
    error: false,
  }
  componentDidMount() {
    const location = url.parse(window.location.href)
    const path = location.pathname.split('/')
    const catalogNumber = path[3].trim().toLowerCase
    fetch(`/catalog/json/subject/${path[2]}.json`)
      .then(response => {
        return response.json()
      })
      .then(courses => {
        courses.forEach(course => {
          if (course.CATALOG_NBR.trim().toLowerCase() === catalogNumber) {
            this.setState({
              course: course,
            })
          }
        })
      })
      .catch(error => {
        this.setState({
          error: true,
        })
      })
  }

  render() {
    const { course, error } = this.state

    return (
      <Layout pageTitle="Courses" siteTitle="Courses">
        <SiteHeader path="/catalog">Catalog</SiteHeader>
        <Container>
          {error && (
            <>
              <PageTitle>Course not found</PageTitle>
              <p>Sorry, we could not find that course.</p>
            </>
          )}
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
