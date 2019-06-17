import React, { Component } from 'react'
import { Layout, PageTitle, SiteHeader } from '../../components/layouts/default'
import Container from '../../components/common/container'
import { CourseList, ScheduleBackLink } from '../../components/schedule'

class SubjectCourseList extends Component {
  render() {
    const { subject, term } = this.props.pageContext
    return (
      <Layout
        pageTitle={`${term.DESCR} ${subject.name} courses`}
        siteTitle="Class Schedule"
      >
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
