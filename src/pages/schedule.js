import React from 'react'
import Layout from 'components/layouts/default'
import { graphql } from 'gatsby'
import { navigate } from '@reach/router'
class SchedulePage extends React.Component {
  componentDidMount() {
    window.location.href =
      `/schedule/${this.props.data.site.siteMetadata.schedule.currentTermName}`

  }

  render() {
    return <Layout />
  }
}

export default SchedulePage

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
