import React from 'react'
import Link from 'gatsby-link'
import Layout from '../../components/layouts/default'

class CourseList extends React.Component {

  render() {
    const subject = this.props.pageContext.subject
    const term = this.props.pageContext.term
    return(
      <Layout>
        <h1>{term.DESCR} Schedule {subject.name}</h1>
        
      </Layout>
    )
  }
}

export default CourseList
