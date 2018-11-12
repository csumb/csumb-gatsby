import React from 'react'
import Layout from 'components/layouts/default'
import { CourseList } from 'components/schedule'
import Container from 'components/container'
import PageTitle from 'components/page-title'
import SiteHeader from 'components/layouts/components/site-header'
class GECourseList extends React.Component {
  render() {
    const { ge, term } = this.props.pageContext
    return (
      <Layout>
        <SiteHeader path="/schedule">Class Schedule</SiteHeader>
        <Container topPadding>
          <PageTitle sub={ge.name}>{term.DESCR}</PageTitle>
          <CourseList {...this.props.pageContext} />
        </Container>
      </Layout>
    )
  }
}

export default GECourseList
