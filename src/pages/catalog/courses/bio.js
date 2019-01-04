import React from 'react'
import { CoursePage } from 'components/pages/course'
import { graphql } from 'gatsby'

const CourseListPage = ({ data }) => (
  <CoursePage courses={data.allCatalogCsv.edges} title="Biology" />
)

export default CourseListPage

export const query = graphql`
  {
    allCatalogCsv(
      filter: { SUBJECT: { eq: "BIO" } }
      sort: { fields: CATALOG_NBR }
    ) {
      edges {
        node {
          SUBJECT
          CATALOG_NBR
          COURSE_TITLE_LONG
          DESCRLONG
          UNITS_MINIMUM
          UNITS_MAXIMUM
        }
      }
    }
  }
`
