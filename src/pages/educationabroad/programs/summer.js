import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/layouts/sections/header/site-header'
import Container from 'components/common/container'
import PageTitle from 'components/layouts/sections/header/page-title'
import { graphql } from 'gatsby'
import SiteNavigation from 'components/layouts/sections/navigation/site'
import Blocks from 'templates/blocks'
import { EducationAbroadProgramList } from 'components/pages/educationabroad'

const EducationAbroadProgramsSummer = ({ data }) => (
  <Layout pageTitle="Summer programs">
    <SiteHeader path="/educationabroad">Education Abroad</SiteHeader>
    {data.allCsumbNavigation &&
      data.allCsumbNavigation.edges &&
      data.allCsumbNavigation[0] && (
        <SiteNavigation
          navigation={data.allCsumbNavigation.edges[0].node.navigation}
        />
      )}
    <Container>
      <PageTitle>Summer programs</PageTitle>
      {data.allCsumbPage &&
        data.allCsumbPage.edges &&
        data.allCsumbPage.edges[0] && (
          <Blocks blocks={data.allCsumbPage.edges[0].node.pageContent} />
        )}
      <EducationAbroadProgramList programs={data.allAirtable.edges} />
    </Container>
  </Layout>
)

export default EducationAbroadProgramsSummer

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
        pagePath: { eq: "educationabroad/short-term-programs-editing" }
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
    allAirtable(
      filter: {
        data: { Publish: { eq: true }, Program_Type: { eq: "Summer" } }
        queryName: { in: ["StudyAbroadProgram"] }
      }
      sort: { fields: [data___Name] }
    ) {
      edges {
        node {
          recordId
          queryName
          data {
            Name
            Program_Type

            Summer_Application_Deadline {
              recordId
              data {
                Name
              }
            }
            Countries {
              recordId
              data {
                Name
                Continent
              }
            }
            Partner {
              recordId

              data {
                City
              }
            }
          }
        }
      }
    }
  }
`
