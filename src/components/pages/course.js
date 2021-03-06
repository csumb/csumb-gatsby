import React from 'react'
import styled from '@emotion/styled'
import { Layout } from '../layouts/default'
import Container from '../common/container'
import PageTitle from '../layouts/sections/header/page-title'
import Link from 'gatsby-link'

const CouseListWrapper = styled('div')`
  margin-bottom: 1rem;
`

const CouseListTitle = styled('h3')`
  margin-bottom: 0.5rem;
`

const CourseListDescription = styled('p')`
  margin-bottom: 0.2rem;
  margin-left: 1rem;
`

const CourseListItem = ({
  SUBJECT,
  CATALOG_NBR,
  COURSE_TITLE_LONG,
  DESCRLONG,
  UNITS_MINIMUM,
  UNITS_MAXIMUM,
}) => (
  <CouseListWrapper>
    <CouseListTitle>
      <Link to={`${SUBJECT.toLowerCase()}/${CATALOG_NBR.toLowerCase().trim()}`}>
        {SUBJECT} {CATALOG_NBR}: {COURSE_TITLE_LONG}
      </Link>
    </CouseListTitle>
    <CourseListDescription>{DESCRLONG}</CourseListDescription>
    <CourseListDescription>
      <strong>Units:</strong> {UNITS_MINIMUM} - {UNITS_MAXIMUM}
    </CourseListDescription>
  </CouseListWrapper>
)

const CoursePage = ({ courses, title }) => (
  <Layout pageTitle={`${title} `}>
    <Container>
      <PageTitle>{title} </PageTitle>
      {courses.map(course => (
        <CourseListItem {...course.node} />
      ))}
    </Container>
  </Layout>
)

export { CourseListItem, CoursePage }
