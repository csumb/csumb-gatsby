import React from 'react'
import Link from 'gatsby-link'
import Layout from '../../components/layouts/default'

class CourseList extends React.Component {

  render() {
    console.log(this.props.pageContext)
    const term = this.props.pageContext.term
    return(
      <Layout>
        <h1>{term.DESCR} Schedule</h1>
        
      </Layout>
    )
  }
}

export default CourseList
