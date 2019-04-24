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
import { EducationAbroadProgramList } from 'components/pages/educationabroad'

const EducationAbroadProgramsSummer = ({ data }) => (
  <Layout pageTitle="Summer programs">
    <SiteHeader path="/educationabroad">Education Abroad</SiteHeader>
    {data.allCsumbNavigation && (
      <SiteNavigation
        navigation={data.allCsumbNavigation.edges[0].node.navigation}
      />
    )}
    <Container>
      <PageTitle>Summer programs</PageTitle>
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