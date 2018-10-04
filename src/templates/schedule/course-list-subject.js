import React from 'react'
import Layout from '../../components/layouts/default'
import CourseListItem from './course-list-item'

class CourseList extends React.Component {

  render() {
    const subject = this.props.pageContext.subject
    const term = this.props.pageContext.term
    return(
      <Layout>
        <h1>{term.DESCR} Schedule Subject {subject.name}</h1>
        {this.props.pageContext.courses.map(course => (
          <CourseListItem course={course} term={term} key={course.CRN}/>
        ))}
      </Layout>
    )
  }
}

export default CourseList
