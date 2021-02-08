import React from 'react'
import { graphql } from 'gatsby'
import { EducationAbroadSearchAreaPage } from '../../../../components/pages/educationabroad'

const EducationAbroadSearchAreaSummerPage = ({ data }) => (
  <EducationAbroadSearchAreaPage
    data={data}
    programType="Summer"
    title="Summer programs by subject area"
    slug="/educationabroad/programs/by-area/summer"
  />
)

export default EducationAbroadSearchAreaSummerPage

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
        pagePath: {
          eq: "educationabroad/semesteryear-programs-subject-area-editing"
        }
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
        queryName: { in: ["StudyAbroadAreas"] }
        data: {
          Semester_Year_Programs: {
            elemMatch: { data: { Program_Type: { eq: "Summer" } } }
          }
        }
      }
      sort: { fields: [data___Subject_Area, data___Name] }
    ) {
      edges {
        node {
          recordId
          queryName
          data {
            Name
            Subject_Area
            Major
            Semester_Year_Programs {
              recordId
              data {
                Name
                Program_Type
                Publish
              }
            }
          }
        }
      }
    }
  }
`
