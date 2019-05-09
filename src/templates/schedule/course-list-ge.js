import React, { Component } from 'react'
import Layout from 'components/layouts/default'
import { CourseList, ScheduleBackLink } from 'components/pages/schedule'
import Container from 'components/common/container'
import PageTitle from 'components/layouts/sections/header/page-title'
import SiteHeader from 'components/layouts/sections/header/site-header'

class GECourseList extends Component {
  render() {
    const { ge, term } = this.props.pageContext
    return (
      <Layout
        pageTitle={`${term.DESCR} ${ge.name} courses`}
        siteTitle="Class Schedule"
      >
        <SiteHeader path="/schedule">Class Schedule</SiteHeader>
        <Container topPadding>
          <PageTitle sub={ge.name}>{term.DESCR}</PageTitle>
          <ScheduleBackLink term={term} />
          <CourseList {...this.props.pageContext} />
        </Container>
      </Layout>
    )
  }
}

export default GECourseList
