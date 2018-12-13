import React from 'react'
import { Flex, Box } from '@rebass/grid/emotion'
import { InputText, Submit } from 'components/forms'
import { navigate } from '@reach/router'
import Container from 'components/container'
import Layout from 'components/layouts/default'
import url from 'url'
import Link from 'gatsby-link'
import SiteHeader from 'components/site-header'
import { graphql } from 'gatsby'

const PersonListing = ({ firstName, lastName, email }) => {
  const link = email.split('@').shift()
  return (
    <div>
      <h3>
        <Link to={`/directory/person/${link}`}>
          {firstName} {lastName}
        </Link>
      </h3>
    </div>
  )
}

const DepartmentListing = ({ name }) => (
  <div>
    <h3>{name}</h3>
  </div>
)

class DirectorySearchResults extends React.Component {
  state = {
    search: false,
  }
  componentDidMount() {
    const { query, people } = this.props
    let search = {
      people: [],
      departments: [],
    }
    people.forEach(person => {
      const name = `${person.node.user.firstName} ${person.node.user.lastName}`
      if (name.toLowerCase().search(query.toLowerCase()) > -1) {
        search.people.push(person.node.user)
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
            {/*{search.departments.map(result => (
              <DepartmentListing key={result.email} {...result} />
            ))}*/}
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

  handleSubmit(event) {
    event.preventDefault()
    navigate(`/directory/search/?q=${this.state.query}`)
  }

  handleChange(event) {
    this.setState({
      query: event.target.value.toLowerCase(),
    })
  }

  render() {
    return (
      <Layout>
        <SiteHeader path="/directory">Directory</SiteHeader>
        <Container>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <h2>Search people and departments</h2>
            <Flex flexWrap="wrap">
              <Box width={[1, 1, 3 / 4, 3 / 4]} px={2}>
                <InputText
                  name="search"
                  label="Search the directory"
                  onChange={this.handleChange.bind(this)}
                  value={this.state.query}
                  huge
                  hideLabel
                />
              </Box>
              <Box width={[1, 1, 1 / 4, 1 / 4]} px={2}>
                <Submit value="Search" huge nomargin />
              </Box>
            </Flex>
          </form>
          {this.state.query && (
            <DirectorySearchResults
              query={this.state.query}
              people={this.props.data.allCsumbDirectory.edges}
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
            directoryPhoto
          }
        }
      }
    }
  }
`
