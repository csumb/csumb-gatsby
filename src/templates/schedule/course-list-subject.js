import React from 'react'
import Layout from 'components/layouts/default'
import Container from 'components/container'
import { CourseList } from 'components/schedule'
import PageTitle from 'components/page-title'
import SiteHeader from 'components/layouts/components/site-header'

class SubjectCourseList extends React.Component {
  render() {
    const subject = this.props.pageContext.subject
    const term = this.props.pageContext.term
    return (
      <Layout>
        <SiteHeader path="/schedule">Class Schedule</SiteHeader>
        <Container topPadding>
          <PageTitle sub={subject.name}>{term.DESCR}</PageTitle>
          <CourseList {...this.props.pageContext} />
        </Container>
      </Layout>
    )
  }
}

export default SubjectCourseList
