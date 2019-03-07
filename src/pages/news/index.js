import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/header/site-header'
import Container from 'components/container'
import { graphql } from 'gatsby'
import SiteNavigation from 'components/navigation/site'

const NewsPage = ({ data }) => {
  return (
    <Layout pageTitle="News">
      <SiteHeader path="/news">News</SiteHeader>
      {data.allCsumbNavigation && (
        <SiteNavigation
          navigation={data.allCsumbNavigation.edges[0].node.navigation}
        />
      )}
      <Container />
    </Layout>
  )
}

export default NewsPage

export const query = graphql`
  {
    allCsumbNavigation(filter: { site: { eq: "news" } }) {
      edges {
        node {
          navigation
        }
      }
    }
  }
`
