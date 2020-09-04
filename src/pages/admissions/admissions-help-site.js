import React, { Component } from 'react'
import {
  Layout,
  PageTitle,
  SiteHeader,
  SiteNavigation,
} from '../../components/layouts/default'
import Container from '../../components/common/container'
import { graphql } from 'gatsby'
import Blocks from '../../templates/blocks'
import Serenova from '../../components/utilities/serenova'

class AdmissionsPage extends Component {
  componentDidMount() {
    if (typeof window === 'undefined') {
      return
    }
  }
  render() {
    const { data } = this.props
    return (
      <Layout pageTitle={data.allCsumbPage.edges[0].node.title}>
        <Serenova site="admissions" />
        <SiteHeader path={data.allCsumbPage.edges[0].node.pagePath}>
          Admissions
        </SiteHeader>
        {data.allCsumbNavigation &&
          data.allCsumbNavigation.edges &&
          data.allCsumbNavigation.edges[0] && (
            <SiteNavigation
              navigation={data.allCsumbNavigation.edges[0].node.navigation}
            />
          )}
        <Container>
          <PageTitle>{data.allCsumbPage.edges[0].node.title}</PageTitle>

          {data.allCsumbPage &&
            data.allCsumbPage.edges &&
            data.allCsumbPage.edges[0] && (
              <Blocks blocks={data.allCsumbPage.edges[0].node.pageContent} />
            )}
        </Container>
      </Layout>
    )
  }
}

export default AdmissionsPage

export const query = graphql`
  {
    allCsumbNavigation(filter: { site: { eq: "admissions" } }) {
      edges {
        node {
          navigation
        }
      }
    }
    allCsumbPage(
      filter: {
        pagePath: { eq: "admissions/admissions-help-site" }
        site: { eq: "admissions" }
      }
    ) {
      edges {
        node {
          pagePath
          title
          pageContent
          layout
        }
      }
    }
  }
`
