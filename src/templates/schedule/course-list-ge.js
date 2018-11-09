import React from 'react'
import Layout from 'components/layouts/default'
import { CourseList } from 'components/schedule'
import Container from 'components/container'
import SiteHeader from 'components/layouts/components/site-header'
class GECourseList extends React.Component {
  render() {
    const ge = this.props.pageContext.ge
    const term = this.props.pageContext.term
    return (
      <Layout>
        <SiteHeader path="/schedule">Class Schedule</SiteHeader>
        <Container topPadding>
          <h1>
            {term.DESCR} General Education {ge.name}
          </h1>
          <CourseList {...this.props.pageContext} />
        </Container>
      </Layout>
    )
  }
}

export default GECourseList
