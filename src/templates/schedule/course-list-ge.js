import React from 'react'
import Layout from '../../components/layouts/default'
import CourseListItem from './course-list-item'

class CourseList extends React.Component {

  render() {
    const ge = this.props.pageContext.ge
    const term = this.props.pageContext.term
    console.log(this.props.pageContext)
    return(
      <Layout>
        <h1>{term.DESCR} General Education {ge.name}</h1>
        {this.props.pageContext.courses.map(course => (
          <CourseListItem course={course} term={term} key={course.CRN}/>
        ))}
      </Layout>
    )
  }
}

export default CourseList
