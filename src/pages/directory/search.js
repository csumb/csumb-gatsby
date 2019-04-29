import React from 'react'
import { Flex, Box } from '@rebass/grid/emotion'
import { InputText, Submit } from 'components/common/forms'
import styled from '@emotion/styled'
import Container from 'components/common/container'
import Layout from 'components/layouts/default'
import url from 'url'
import Link from 'gatsby-link'
import LinkInspect from 'components/utilities/link-inspect'
import SiteHeader from 'components/layouts/sections/header/site-header'
import { graphql } from 'gatsby'
import phoneFormatter from 'phone-formatter'
import { DirectoryNavigation } from 'components/pages/directory'

const DirectoryItem = styled('div')`
  margin-bottom: 2rem;
`

const DirectoryDetail = styled('p')`
  margin: 0;
  ${props =>
    props.small &&
    `
    font-size: 80%;
  `};
`

const DirectoryTitle = styled('h3')`
  margin-bottom: 0.2rem;
`

const DirectoryPosition = styled('div')`
  margin-top: 1rem;
  h4 {
    margin: 0;
  }
`

const PersonListing = props => {
  const {
    firstName,
    lastName,
    directoryJobClass,
    directoryTitle,
    directoryDepartment,
    email,
    buildings,
    _publicProfile,
  } = props
  const link = email.split('@').shift()
  return (
    <DirectoryItem>
      <DirectoryTitle>
        <Link to={`/directory/person/${link}`}>
          {firstName} {lastName}
        </Link>
      </DirectoryTitle>
      <Flex flexWrap="wrap">
        <Box width={[1, 1, 1 / 2]} px={2}>
          {directoryJobClass.map((jobClass, key) => (
            <DirectoryPosition key={key}>
              <h4>{directoryTitle[key] && <>{directoryTitle[key]}</>}</h4>
              {directoryDepartment[key]}
            </DirectoryPosition>
          ))}
        </Box>
        <Box width={[1, 1, 1 / 2]} px={2}>
          {email && (
            <DirectoryDetail>
              <a href={`mailto:${email}`}>{email}</a>
            </DirectoryDetail>
          )}
          {_publicProfile && _publicProfile.phone && (
            <DirectoryDetail>
              {phoneFormatter.format(_publicProfile.phone, '(NNN) NNN-NNNN')}
            </DirectoryDetail>
          )}

          {_publicProfile &&
            _publicProfile.buildingCode &&
            buildings[_publicProfile.buildingCode] && (
              <>
                <Link to={`/buildings/${_publicProfile.buildingCode}`}>
                  {buildings[_publicProfile.buildingCode]}
                </Link>
                <>
                  {_publicProfile.location && (
                    <DirectoryDetail>
                      <strong>Room: </strong>
                      {_publicProfile.location.split('-').pop()}
                    </DirectoryDetail>
                  )}
                </>
              </>
            )}
        </Box>
      </Flex>
    </DirectoryItem>
  )
}

const DepartmentListing = props => {
  const {
    name,
    phone,
    fax,
    email,
    floor,
    suite,
    room,
    website,
    building_code,
    building_name,
  } = props
  return (
    <DirectoryItem>
      {' '}
      <DirectoryTitle>
        {website ? <LinkInspect to={website}>{name}</LinkInspect> : <>{name}</>}
      </DirectoryTitle>
      {email && (
        <DirectoryDetail>
          <a href={`mailto:${email}`}>{email}</a>
        </DirectoryDetail>
      )}
      {phone && <DirectoryDetail>{phone}</DirectoryDetail>}
      {fax && (
        <DirectoryDetail small>
          <strong>Fax:</strong>
          {fax}
        </DirectoryDetail>
      )}
      {building_code && (
        <Link to={`building/${building_code}`}>{building_name}</Link>
      )}
      {floor && (
        <DirectoryDetail>
          <strong>Floor: </strong>
          {floor}
        </DirectoryDetail>
      )}
      {suite && (
        <DirectoryDetail>
          <strong>Suite: </strong>
          {suite}
        </DirectoryDetail>
      )}
      {room && (
        <DirectoryDetail>
          <strong>Room: </strong>
          {room}
        </DirectoryDetail>
      )}
    </DirectoryItem>
  )
}

class DirectorySearchResults extends React.Component {
  state = {
    search: false,
  }

  componentDidMount() {
    this.searchDirectory()
  }

  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      this.searchDirectory()
      const url = `${window.location.protocol}//${window.location.host}${
        window.location.pathname
      }?q=${this.props.query}`
      window.history.pushState({ path: url }, '', url)
    }
  }

  searchDirectory() {
    const { query, people, departments } = this.props
    let search = {
      people: [],
      departments: [],
    }
    people.forEach(person => {
      const { user } = person.node
      const name = `${user.firstName} ${user.lastName}`
      if (name.toLowerCase().search(query.toLowerCase()) > -1) {
        search.people.push(user)
      }
    })
    departments.forEach(department => {
      if (
        department.node.name &&
        department.node.name.toLowerCase().search(query.toLowerCase()) > -1
      ) {
        search.departments.push(department.node)
      }
    })

    this.setState({
      search: search,
    })
  }

  render() {
    const { search } = this.state
    const { buildings } = this.props
    return (
      <>
        {search && (
          <>
            {search.departments.map(result => (
              <DepartmentListing key={result.name} {...result} />
            ))}
            {search.people.map(result => (
              <PersonListing
                buildings={buildings}
                key={result.email}
                {...result}
              />
            ))}
          </>
        )}
      </>
    )
  }
}

class DirectorySearchPage extends React.Component {
  state = {
    query: false,
  }

  updatedQuery = false

  componentDidMount() {
    let query = null
    let location = url.parse(window.location.href, true)
    if (location.query && typeof location.query.q !== 'undefined') {
      query = location.query.q
    }
    this.setState({
      query: query,
    })
  }

  handleChange(event) {
    this.updatedQuery = event.target.value.toLowerCase()
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({
      query: this.updatedQuery,
    })
  }

  render() {
    const { query } = this.state
    const { data } = this.props
    let buildings = {}
    data.allCsumbBuilding.edges.map(building => {
      return (buildings[building.node.code] = building.node.buildingName)
    })
    return (
      <Layout>
        <SiteHeader path="/directory">Directory</SiteHeader>
        <DirectoryNavigation />
        <Container topPadding>
          <form
            method="get"
            action="/directory/search"
            onSubmit={this.handleSubmit.bind(this)}
          >
            <h2>Search people and departments</h2>
            <Flex flexWrap="wrap">
              <Box width={[1, 1, 3 / 4, 3 / 4]} px={2}>
                <InputText
                  name="q"
                  label="Search the directory"
                  onChange={this.handleChange.bind(this)}
                  defaultValue={query ? query : ''}
                  huge
                  hideLabel
                />
              </Box>
              <Box width={[1, 1, 1 / 4, 1 / 4]} px={2}>
                <Submit value="Search" huge nomargin />
              </Box>
            </Flex>
          </form>
          {query && (
            <DirectorySearchResults
              query={query}
              people={data.allCsumbDirectory.edges}
              departments={data.allCsumbDepartment.edges}
              buildings={buildings}
            />
          )}
        </Container>
      </Layout>
    )
  }
}

export default DirectorySearchPage

export const query = graphql`
  {
    allCsumbDirectory(
      sort: { fields: [user___lastName, user___firstName] }
      filter: {
        user: {
          directoryJobClass: {
            nin: [
              "1800"
              "4660"
              "2403"
              "1870"
              "1871"
              "1868"
              "1872"
              "1874"
              "1875"
              "1876"
            ]
          }
        }
      }
    ) {
      edges {
        node {
          user {
            firstName
            lastName
            directoryJobClass
            directoryTitle
            directoryDepartment
            directoryPhone
            email
            _publicProfile {
              phone
              biography
              photo
              buildingCode
              location
              appointmentCalendar
            }
          }
        }
      }
    }

    allCsumbBuilding {
      edges {
        node {
          buildingName
          code
        }
      }
    }

    allCsumbDepartment(sort: { fields: name }) {
      edges {
        node {
          name
          phone
          fax
          email
          floor
          suite
          room
          website
          short_name
          building_code
          building_name
        }
      }
    }
  }
`
