import React from 'react'
import Layout from 'components/layouts/default'
import { graphql } from 'gatsby'
import Container from 'components/container'
import { navigate } from '@reach/router'

class ScheduleBouncePage extends React.Component {
  componentDidMount() {
    navigate(
      `/schedule/${this.props.data.site.siteMetadata.schedule.currentTermName}`
    )
  }

  render() {
    return (
      <Layout pageTitle="Class Schedule">
        <Container />
      </Layout>
    )
  }
}

export default ScheduleBouncePage

export const query = graphql`
  {
    site {
      siteMetadata {
        schedule {
          currentTermName
        }
      }
    }
  }
`
