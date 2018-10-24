import React from 'react'
import Link from 'gatsby-link'
import Layout from '../../components/layouts/default'
import Container from '../../components/container'

class ScheduleFront extends React.Component {
  render() {
    const term = this.props.pageContext.term
    return (
      <Layout>
        <Container>
          <h1>{term.DESCR} Schedule</h1>
          <div>
            {this.props.pageContext.termSubjects.map(subject => (
              <p key={subject.code}>
                <Link
                  to={`/schedule/${term.DESCR.toLowerCase().replace(
                    ' ',
                    ''
                  )}/${subject.code.toLowerCase()}`}
                >
                  {subject.code}
                </Link>{' '}
                - {subject.name}
              </p>
            ))}
          </div>
          <div>
            <h3>General Education</h3>
            {this.props.pageContext.ge.map(ge => (
              <p key={ge.node.code}>
                <Link
                  to={`/schedule/${term.DESCR.toLowerCase().replace(
                    ' ',
                    ''
                  )}/ge/${ge.node.code.toLowerCase()}`}
                >
                  {ge.node.name}
                </Link>
              </p>
            ))}
          </div>
        </Container>
      </Layout>
    )
  }
}

export default ScheduleFront
