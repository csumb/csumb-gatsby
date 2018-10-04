import React from 'react'
import Layout from '../components/layouts/default'
import { graphql } from 'gatsby'
class SchedulePage extends React.Component {
  
  /*constructor(props) {
    super(props)

    let state = {
      subjects: []
    }

    let subjects = {}
    let finalSubjects = {}

    props.data.allSubjectsCsv.edges.map(subject => {
      return subjects[subject.node.code] = subject.node
    })

    props.data.allScheduleCsv.edges.map(schedule => {
      if(typeof subjects[schedule.node.SUBJECT] !== 'undefined') {
        finalSubjects[schedule.node.SUBJECT] = subjects[schedule.node.SUBJECT]
      }
      return finalSubjects[schedule.node.SUBJECT]
    })
    state.subjects = Object.values(finalSubjects)
    
    this.state = state
  }*/
  
  render() {
    return (
      <Layout>
        Howdy
      </Layout>
    );
  }
}

export default SchedulePage

export const query = graphql`
{
  site {
    siteMetadata {
      schedule {
        currentTerm
      }
    }
  }
}
`