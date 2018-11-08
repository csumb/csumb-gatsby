import React from 'react'
import Layout from 'components/layouts/default'
import Container from 'components/container'
import { CourseList } from 'components/schedule'

class SubjectCourseList extends React.Component {
  render() {
    const subject = this.props.pageContext.subject
    const term = this.props.pageContext.term
    return (
      <Layout>
        <Container>
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
