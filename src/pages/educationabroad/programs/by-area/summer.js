import React from 'react'
import { graphql } from 'gatsby'
import { EducationAbroadSearchAreaPage } from 'components/pages/educationabroad'

const EducationAbroadSearchAreaSummerPage = ({ data }) => (
  <EducationAbroadSearchAreaPage
    data={data}
    title="Summer programs by subject area"
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
        data: {
          Semester_Year_Programs: {
            elemMatch: { data: { Program_Type: { eq: "Summer" } } }
          }
        }
        queryName: { in: ["StudyAbroadMajors", "StudyAbroadAreas"] }
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
