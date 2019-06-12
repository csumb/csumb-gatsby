import React from 'react'
import { graphql } from 'gatsby'
import { EducationAbroadSearchAreaPage } from '../../../../components/pages/educationabroad'

const EducationAbroadSearchAreaSemesterPage = ({ data }) => (
  <EducationAbroadSearchAreaPage
    data={data}
    programType="Semester"
    title="Semester Programs by subject area"
  />
)
export default EducationAbroadSearchAreaSemesterPage

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
            elemMatch: { data: { Program_Type: { eq: "Semester" } } }
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
