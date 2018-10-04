import React from 'react'
import Layout from '../../components/layouts/default'
import CourseListItem from './course-list-item'

class CourseList extends React.Component {

  render() {
    const subject = (typeof this.props.pageContext.subject) ?
      this.props.pageContext.subject :
      false
    const ge = (typeof this.props.pageContext.ge) ?
      this.props.pageContext.ge :
      false
    const term = this.props.pageContext.term
    return(
      <Layout>
        <h1>{term.DESCR} Schedule {(subject) ? subject.name : ge.name}</h1>
        {this.props.pageContext.courses.map(course => (
          <CourseListItem course={course} term={term}/>
        ))}
      </Layout>
    )
  }
}

export default CourseList
