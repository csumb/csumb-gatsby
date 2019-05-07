import React, { Component } from 'react'
import Layout from 'components/layouts/default'
import Container from 'components/common/container'
import { CourseList, ScheduleBackLink } from 'components/pages/schedule'
import PageTitle from 'components/layouts/sections/header/page-title'
import SiteHeader from 'components/layouts/sections/header/site-header'

class SubjectCourseList extends Component {
  render() {
    const { subject, term } = this.props.pageContext
    return (
      <Layout>
        <SiteHeader path="/schedule">Class Schedule</SiteHeader>
        <Container topPadding>
          <PageTitle sub={subject.name}>{term.DESCR}</PageTitle>
          <ScheduleBackLink term={term} />
          <CourseList {...this.props.pageContext} />
        </Container>
      </Layout>
    )
  }
}

export default SubjectCourseList
