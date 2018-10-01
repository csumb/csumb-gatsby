import React from 'react'
import Layout from '../components/layouts/default'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'

const termCode = '2184'
class SchedulePage extends React.Component {
  
  constructor(props) {
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
  }
  
  render() {
    return (
      <Layout>
        <h1>{this.props.data.allTermCsv.edges[0].node.DESCR} Schedule</h1>
        <div>
          {this.state.subjects.map(subject => (
            <p>
              <Link to={`/schedule/${subject.code.toLowerCase()}`}>{subject.code}</Link> - {subject.name}
            </p>
          ))}
        </div>
        <div>
          <h3>General Education</h3>
          {this.props.data.allGeCsv.edges.map(ge => (
            <p>
              <Link to={`/schedule/ge/${ge.node.code.toLowerCase()}`}>{ge.node.name}</Link>
            </p>
          ))}
        </div>
      </Layout>
    );
  }
}

export default SchedulePage

export const query = graphql`
{
  allSubjectsCsv {
    edges {
      node {
        code
        name
      }
    }
  }

  allGeCsv {
    edges {
      node {
        code
        name
      }
    }
  }

  allScheduleCsv(filter: {STRM: {eq: "2184"}}) {
    edges {
      node {
        SUBJECT
      }
    }
  }

  allTermCsv(
    filter:{
      TERM:{eq:"2184"}
      SESSION_CODE:{eq: "1"}
    }
  ) {
    edges {
      node {
        TERM
        DESCR
        SESSION_CODE
      }
    }
  }
}
`