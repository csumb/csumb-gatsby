import React from 'react'
import Layout from 'components/layouts/default'
import Container from 'components/container'
import { CourseList } from 'components/schedule'
import SiteHeader from 'components/layouts/components/site-header'

class SubjectCourseList extends React.Component {
  render() {
    const subject = this.props.pageContext.subject
    const term = this.props.pageContext.term
    return (
      <Layout>
        <SiteHeader path="/schedule">Class Schedule</SiteHeader>
        <Container topPadding>
          <h1>
            {term.DESCR} Schedule Subject {subject.name}
          </h1>
          <CourseList {...this.props.pageContext} />
        </Container>
      </Layout>
    )
  }
}

export default SubjectCourseList
