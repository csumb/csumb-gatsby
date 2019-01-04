import React from 'react'
import { Flex, Box } from '@rebass/grid/emotion'
import { InputText, Submit } from 'components/forms'
import styled from 'react-emotion'
import Container from 'components/container'
import Layout from 'components/layouts/default'
import url from 'url'
import Link from 'gatsby-link'
import SiteHeader from 'components/header/site-header'
import { graphql } from 'gatsby'

const DirectoryItem = styled('div')`
  margin-bottom: 1rem;
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

const PersonListing = ({ firstName, lastName, email }) => {
  const link = email.split('@').shift()
  return (
    <DirectoryItem>
      <Flex flexWrap="wrap">
        <Box width={[1, 1 / 2]} px={2}>
          <DirectoryTitle>
            <Link to={`/directory/person/${link}`}>
              {firstName} {lastName}
            </Link>
          </DirectoryTitle>
        </Box>
      </Flex>
    </DirectoryItem>
  )
}

const DepartmentListing = ({ name, phone, fax, email }) => (
  <DirectoryItem>
    <Flex flexWrap="wrap">
      <Box width={[1, 1 / 2]} px={2}>
        <DirectoryTitle>{name}</DirectoryTitle>
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
      </Box>
      <Box width={[1, 1 / 2]} px={2} />
    </Flex>
  </DirectoryItem>
)

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
    return (
      <>
        {search && (
          <>
            {search.departments.map(result => (
              <DepartmentListing key={result.name} {...result} />
            ))}
            {search.people.map(result => (
              <PersonListing key={result.email} {...result} />
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
    return (
      <Layout>
        <SiteHeader path="/directory">Directory</SiteHeader>
        <Container>
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
          directoryJobClass: { ne: "1800" }
          directoryJobClass: { ne: "4660" }
          directoryJobClass: { ne: "2403" }
          directoryJobClass: { ne: "1870" }
          directoryJobClass: { ne: "1871" }
          directoryJobClass: { ne: "1868" }
          directoryJobClass: { ne: "1872" }
          directoryJobClass: { ne: "1874" }
          directoryJobClass: { ne: "1875" }
          directoryJobClass: { ne: "1876" }
        }
      }
    ) {
      edges {
        node {
          user {
            firstName
            lastName
            directoryBuilding
            directoryBuildingCode
            directoryJobClass
            directoryTitle
            directoryDepartment
            directoryPhone
            email
          }
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
          short_name
        }
      }
    }
  }
`
