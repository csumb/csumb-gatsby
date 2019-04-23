/**
 * Use this template if you just need to start with a "regular" page
 * that imports the site navigation from a specific site with GraphQL.
 */
import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/header/site-header'
import Container from 'components/container'
import PageTitle from 'components/header/page-title'
import { graphql } from 'gatsby'
import SiteNavigation from 'components/navigation/site'

class Page extends React.Component {
  componentDidMount() {}

  render() {
    const { data } = this.props
    return (
      <Layout pageTitle="">
        <SiteHeader path="/" />
        {data.allCsumbNavigation && (
          <SiteNavigation
            navigation={data.allCsumbNavigation.edges[0].node.navigation}
          />
        )}
        <Container>
          <PageTitle>Title</PageTitle>
        </Container>
      </Layout>
    )
  }
}

export default Page

export const query = graphql`
  {
    allCsumbNavigation(filter: { site: { eq: "educationabroad" } }) {
      edges {
        node {
          navigation
        }
      }
    }
  }
`
