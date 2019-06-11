import React, { Component } from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/layouts/sections/header/site-header'
import Container from 'components/common/container'
import PageTitle from 'components/layouts/sections/header/page-title'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import { Flex, Box } from 'components/common/grid'
import SiteNavigation from 'components/layouts/sections/navigation/site'
import Link from 'gatsby-link'
import { UnstyledList } from 'components/common/type'
import slugify from 'slugify'
import Well from 'components/common/well'
import Blocks from 'templates/blocks'
import { InputText, InputSelect, Submit } from 'components/common/forms'

const ProgramList = styled(UnstyledList)`
  li {
    display: inline-block;
    margin-right: 1rem;
  }
`

const AllAreasHeader = styled('h2')`
  font-size: 2rem;
  margin-top: 1.5rem;
`

const SubjectArea = ({ area }) => (
  <>
    <h3>{area.Subject_Area}</h3>
    <Flex>
      <Box width={[1, 1 / 4]} pr={[0, 2]} pl={[0, 4]}>
        {area.Major && (
          <>
            <h4>Majors</h4>
            <UnstyledList>
              {area.Major.map(major => (
                <li key={major}>{major}</li>
              ))}
            </UnstyledList>
          </>
        )}
      </Box>
      <Box width={[1, 3 / 4]}>
        {area.Semester_Year_Programs && (
          <>
            <h4>Programs</h4>
            <ProgramList>
              {area.Semester_Year_Programs.map(program => (
                <>
                  {program.data.Publish && (
                    <li key={program.recordId}>
                      <Link
                        to={`/educationabroad/program/${slugify(
                          program.recordId.replace('rec', '')
                        )}`}
                      >
                        {program.data.Name}
                      </Link>
                    </li>
                  )}
                </>
              ))}
            </ProgramList>
          </>
        )}
      </Box>
    </Flex>
  </>
)

class SubjectAreas extends Component {
  state = {
    search: '',
    major: 'all',
    results: [],
  }

  handleSearch(event) {
    event.preventDefault()
    const results = []
    const search = this.state.search.toLocaleLowerCase()

    this.props.areas.forEach(area => {
      if (
        search &&
        this.state.major !== 'all' &&
        area.data.Subject_Area.toLowerCase().search(search) > -1 &&
        area.data.Major.indexOf(this.state.major) > -1
      ) {
        results.push(area)
        return
      }
      if (search && area.data.Subject_Area.toLowerCase().search(search) > -1) {
        results.push(area)
      }
      if (
        this.state.major !== 'all' &&
        area.data.Major &&
        area.data.Major.indexOf(this.state.major) > -1
      ) {
        results.push(area)
      }
    })

    this.setState({
      results: results,
    })
  }

  render() {
    const { results } = this.state
    const { areas, majors } = this.props
    const majorsList = [{ value: 'all', label: 'Any major', selected: true }]
    majors.forEach(major => {
      majorsList.push({
        value: major.data.Name,
        label: major.data.Name,
      })
    })
    return (
      <>
        <Well>
          <h4>Search by area or program</h4>
          <form onSubmit={this.handleSearch.bind(this)}>
            <Flex>
              <Box width={[1, 1 / 4]}>
                <InputText
                  name="educationAbroadSearch"
                  label="Search"
                  hideLabel={true}
                  onChange={event => {
                    this.setState({
                      search: event.target.value,
                    })
                  }}
                  placeholder="Search"
                />
              </Box>
              <Box width={[1, 2 / 4]} px={[0, 2]}>
                <InputSelect
                  name="educationAbroadMajor"
                  label="Major"
                  defaultValue="all"
                  placeholder="Any majors"
                  hideLabel={true}
                  onChange={event => {
                    this.setState({
                      major: event.value,
                    })
                  }}
                  options={majorsList}
                />
              </Box>
              <Box width={[1, 1 / 4]}>
                <Submit value="Search" nomargin={true} small />
              </Box>
            </Flex>
          </form>
          {results && results.length > 0 && (
            <>
              <h2>Search results</h2>
              {results.map(area => (
                <SubjectArea key={area.recordId} area={area.data} />
              ))}
            </>
          )}
        </Well>
        <AllAreasHeader>All areas &amp; programs</AllAreasHeader>
        {areas.map(area => (
          <SubjectArea key={area.recordId} area={area.data} />
        ))}
      </>
    )
  }
}

const EducationAbroadSearchAreaPage = ({ data }) => {
  const areas = []
  const majors = []
  data.allAirtable.edges.forEach(({ node }) => {
    if (node.queryName === 'StudyAbroadMajors') {
      majors.push(node)
    }
    if (node.queryName === 'StudyAbroadAreas') {
      areas.push(node)
    }
  })
  return (
    <Layout pageTitle="Search by area">
      <SiteHeader path="/educationabroad">Education Abroad</SiteHeader>
      {data.allCsumbNavigation &&
        data.allCsumbNavigation.edges &&
        data.allCsumbNavigation[0] && (
          <SiteNavigation
            navigation={data.allCsumbNavigation.edges[0].node.navigation}
          />
        )}
      <Container>
        <PageTitle>Programs by subject area</PageTitle>
        {data.allCsumbPage &&
          data.allCsumbPage.edges &&
          data.allCsumbPage.edges[0] && (
            <Blocks blocks={data.allCsumbPage.edges[0].node.pageContent} />
          )}
        <SubjectAreas areas={areas} majors={majors} />
      </Container>
    </Layout>
  )
}

export default EducationAbroadSearchAreaPage

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
            elemMatch: { data: { Publish: { eq: true } } }
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
