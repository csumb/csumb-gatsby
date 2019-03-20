import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/header/site-header'
import Container from 'components/container'
import { graphql } from 'gatsby'
import SiteNavigation from 'components/navigation/site'
import Blocks from 'templates/blocks'
import PageTitle from 'components/header/page-title'

const ProgramPage = ({ data }) => (
  <Layout pageTitle="Semester/Year Programs by Subject Area">
    <SiteHeader path="/educationabroad">Education Abroad</SiteHeader>
    {data.allCsumbNavigation && (
      <SiteNavigation
        navigation={data.allCsumbNavigation.edges[0].node.navigation}
      />
    )}
    <Container>
      <PageTitle>Semester/Year Programs by Subject Area</PageTitle>

      {data.allCsumbPage && (
        <Blocks blocks={data.allCsumbPage.edges[0].node.pageContent} />
      )}
      <iframe
        src="https://airtable.com/embed/shryWaS21FipG91Vd?backgroundColor=teal&viewControls=on"
        title="List of programs"
        style={{
          border: 'none',
        }}
      />
    </Container>
  </Layout>
)

export default ProgramPage

export const query = graphql`
  {
    allCsumbNavigation(filter: { site: { eq: "educationabroad" } }) {
      edges {
        node {
          navigation
        }
      }
    }
    allCsumbPage(
      filter: {
        pagePath: { eq: "semesteryear-programs-subject-area" }
        site: { eq: "educationabroad" }
      }
    ) {
      edges {
        node {
          pageContent
          layout
        }
      }
    }
  }
`
