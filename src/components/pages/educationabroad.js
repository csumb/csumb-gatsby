import React, { Component } from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import slugify from 'slugify'
import { colors } from '../../style'
import {
  Layout,
  PageTitle,
  SiteHeader,
  SiteNavigation,
} from '../layouts/default'
import Container from '../common/container'
import { Flex, Box } from '../common/grid'
import Link from 'gatsby-link'
import { UnstyledList } from '../common/type'
import Well from '../common/well'
import Blocks from '../../templates/blocks'
import { InputText, InputSelect, Submit } from '../common/forms'

const EducationAbroadWrapper = styled('div')`
  margin-bottom: 1rem;
`

const EducationAbroadChildren = styled('div')`
  margin-left: 1.5rem;
`

const CollapsibleIcon = styled(FontAwesomeIcon)`
  margin-right: 0.8rem;
  font-size: 1rem;
`

const EducationExpandButton = styled('button')`
  padding: 0 0 0.3rem 0;
  cursor: pointer;
  border: 0;
  background: transparent;
  width: 100%;
  border-bottom: 1px solid ${colors.primary.darkest};
  text-align: left;
`

class EducationAbroadCountry extends Component {
  state = {
    isOpen: false,
  }

  render() {
    const { isOpen } = this.state
    const { country, programs } = this.props
    return (
      <EducationAbroadWrapper>
        <h3>
          <EducationExpandButton
            onClick={event => {
              event.preventDefault()
              this.setState({
                isOpen: !isOpen,
              })
            }}
          >
            <CollapsibleIcon
              size="1x"
              icon={isOpen ? faChevronDown : faChevronRight}
              role={`presentation`}
            />
            {country}
          </EducationExpandButton>
        </h3>
        {isOpen && (
          <ul>
            {programs.map(program => (
              <li key={program.recordId}>
                <Link
                  to={`/educationabroad/program/${slugify(
                    program.recordId.replace('rec', '')
                  )}`}
                >
                  {program.data.Name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </EducationAbroadWrapper>
    )
  }
}

class EducationAbroadContinent extends Component {
  state = {
    isOpen: false,
  }

  render() {
    const { name, children } = this.props
    const { isOpen } = this.state
    return (
      <EducationAbroadWrapper>
        <h2>
          <EducationExpandButton
            onClick={event => {
              event.preventDefault()
              this.setState({
                isOpen: !isOpen,
              })
            }}
          >
            <CollapsibleIcon
              size="1x"
              icon={isOpen ? faChevronDown : faChevronRight}
            />
            {name}
          </EducationExpandButton>
        </h2>
        {isOpen && (
          <EducationAbroadChildren>{children}</EducationAbroadChildren>
        )}
      </EducationAbroadWrapper>
    )
  }
}

const EducationAbroadProgramList = ({ programs }) => {
  const countryPrograms = {}
  const continents = {
    Africa: [],
    Asia: [],
    Australia: [],
    Europe: [],
    Oceania: [],
    'North America': [],
    'South America': [],
  }
  programs.forEach(({ node }) => {
    const countryName = node.data.Countries[0].data.Name
    const continent = node.data.Countries[0].data.Continent
    if (
      typeof countryPrograms[countryName] === 'undefined' &&
      typeof continents[continent] !== 'undefined'
    ) {
      countryPrograms[countryName] = []
      continents[continent].push(countryName)
    }
    if (countryPrograms[countryName]) {
    countryPrograms[countryName].push(node)
    }
  })
  Object.keys(continents).forEach(continentName => {
    continents[continentName].sort()
  })
  return (
    <>
      {Object.keys(continents).map(continentName => (
        <>
          {continents[continentName].length > 0 && (
            <EducationAbroadContinent name={continentName}>
              {continents[continentName].map(country => (
                <EducationAbroadCountry
                  country={country}
                  programs={countryPrograms[country]}
                />
              ))}
            </EducationAbroadContinent>
          )}
        </>
      ))}
    </>
  )
}

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

const SubjectArea = ({ area, programType }) => (
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
                  {program.data.Publish &&
                    program.data.Program_Type === programType && (
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
    const { areas, majors, programType } = this.props
    const majorsList = [{ value: 'all', label: 'Any major', selected: true }]
    majors.forEach(major => {
      majorsList.push({
        value: major,
        label: major,
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
                <SubjectArea
                  key={area.recordId}
                  area={area.data}
                  programType={programType}
                />
              ))}
            </>
          )}
        </Well>
        <AllAreasHeader>All areas &amp; programs</AllAreasHeader>
        {areas.map(area => (
          <SubjectArea
            key={area.recordId}
            area={area.data}
            programType={programType}
          />
        ))}
      </>
    )
  }
}

const EducationAbroadSearchAreaPage = ({ data, title, programType }) => {
  const areas = []
  const majors = []
  data.allAirtable.edges.forEach(({ node }) => {
    areas.push(node)
    if (node.data.Major) {
      node.data.Major.forEach(major => {
        if (majors.indexOf(major) === -1) {
          majors.push(major)
        }
      })
    }
  })
  majors.sort()
  return (
    <Layout pageTitle={title}>
      <SiteHeader path="/educationabroad">Education Abroad</SiteHeader>
      {data.allCsumbNavigation &&
        data.allCsumbNavigation.edges &&
        data.allCsumbNavigation[0] && (
          <SiteNavigation
            navigation={data.allCsumbNavigation.edges[0].node.navigation}
          />
        )}
      <Container>
        <PageTitle>{title}</PageTitle>
        {data.allCsumbPage &&
          data.allCsumbPage.edges &&
          data.allCsumbPage.edges[0] && (
            <Blocks blocks={data.allCsumbPage.edges[0].node.pageContent} />
          )}
        <SubjectAreas areas={areas} majors={majors} programType={programType} />
      </Container>
    </Layout>
  )
}

export { EducationAbroadProgramList, EducationAbroadSearchAreaPage }
