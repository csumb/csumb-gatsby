import React from 'react'
import Layout from '../../components/layouts/default'
import CourseListItem from './course-list-item'
import Container from '../../components/container'

class CourseList extends React.Component {
  render() {
    const subject = this.props.pageContext.subject
    const term = this.props.pageContext.term
    return (
      <Layout>
        <Container>
          <h1>
            {term.DESCR} Schedule Subject {subject.name}
          </h1>
          {this.props.pageContext.courses.map(course => (
            <CourseListItem course={course} term={term} key={course.CRN} />
          ))}
        </Container>
      </Layout>
    )
  }
}

export default CourseList
