import React from 'react'
import Layout from 'components/layouts/default'
import { graphql } from 'gatsby'
import Container from 'components/common/container'
import SiteHeader from 'components/layouts/sections/header/site-header'
import PageTitle from 'components/layouts/sections/header/page-title'
import AllPrograms from 'static/all-programs.js'
import SiteNavigation from 'components/layouts/sections/navigation/site'

const AcademicsPage = ({ data }) => (
  <Layout pageTitle="Academics">
    <SiteHeader path="/academics">Academics</SiteHeader>
    {data.allCsumbNavigation && (
      <SiteNavigation
        navigation={data.allCsumbNavigation.edges[0].node.navigation}
      />
    )}
    <Container>
      <PageTitle layout="page">Majors &amp; Programs</PageTitle>
      <AllPrograms />
    </Container>
  </Layout>
)

export default AcademicsPage

export const query = graphql`
  {
    allCsumbNavigation(filter: { site: { eq: "cost" } }) {
      edges {
        node {
          navigation
        }
      }
    }
  }
`
