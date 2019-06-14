import React from 'react'
import {
  Layout,
  PageTitle,
  SiteHeader,
  SiteNavigation,
} from '../../../components/layouts/default'
import Container from '../../../components/common/container'
import { graphql } from 'gatsby'
import Blocks from '../../../templates/blocks'
import { EducationAbroadProgramList } from '../../../components/pages/educationabroad'

const EducationAbroadProgramsSemester = ({ data }) => (
  <Layout pageTitle="Semester programs">
    <SiteHeader path="/educationabroad">Education Abroad</SiteHeader>
    {data.allCsumbNavigation &&
      data.allCsumbNavigation.edges &&
      data.allCsumbNavigation[0] && (
        <SiteNavigation
          navigation={data.allCsumbNavigation.edges[0].node.navigation}
        />
      )}
    <Container>
      <PageTitle>Semester programs</PageTitle>
      {data.allCsumbPage &&
        data.allCsumbPage.edges &&
        data.allCsumbPage.edges[0] && (
          <Blocks blocks={data.allCsumbPage.edges[0].node.pageContent} />
        )}
      <EducationAbroadProgramList programs={data.allAirtable.edges} />
    </Container>
  </Layout>
)

export default EducationAbroadProgramsSemester

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
        pagePath: { eq: "educationabroad/semesteryear-long-programs-editing" }
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
        data: { Publish: { eq: true }, Program_Type: { eq: "Semester" } }
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
