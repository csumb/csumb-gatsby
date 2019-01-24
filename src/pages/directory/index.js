import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/header/site-header'
import styled from '@emotion/styled'
import { InputText, Submit } from 'components/forms'
import Container from 'components/container'
import Link from 'gatsby-link'
import { Box, Flex } from '@rebass/grid/emotion'
import { graphql } from 'gatsby'

const DirectoryPage = ({ data }) => (
  <Layout>
    <SiteHeader path="/directory">Directory</SiteHeader>
    <Container>
      <DirectoryForm directory={data.allCsumbDirectory.edges} />
      <Flex flexWrap="wrap">
        <Box width={[1, 1 / 2]} px={2}>
          <h3>Important numbers</h3>
          <ul>
            <li>
              <strong>
                <a href="/csc">Campus Service Center</a>
              </strong>{' '}
              (831) 582-5100
            </li>
            <li>
              <strong>
                <a href="/financialaid">Financial Aid</a>
              </strong>{' '}
              (831) 582-5100
            </li>
            <li>
              <strong>
                <a href="/admissions">Admissions</a>
              </strong>{' '}
              (831) 582-3738
            </li>
            <li>
              <strong>
                <a href="/housing">Student Housing</a>
              </strong>{' '}
              (831) 582-3378
            </li>
          </ul>
        </Box>
        <Box width={[1, 1 / 2]} px={2}>
          <h3>University police</h3>
          <ul>
            <li>
              <strong>Emergency:</strong> 911
            </li>
            <li>
              <strong>Non-emergency:</strong> (831) 655-0268
            </li>
            <li>
              <strong>Emergency conditions:</strong> (831) 582-5044
            </li>
          </ul>
        </Box>
      </Flex>
    </Container>
  </Layout>
)

const ShortPersonName = styled('span')`
  font-weight: bold;
`

const ShortPersonPhone = styled('span')`
  margin-left: 1rem;
  display: inline-block;
`

const ShortPersonList = styled('ul')`
  list-style-type: none;
  margin-left: 0;
  margin-top: 1rem;
`

const ShortPersonListing = ({ firstName, lastName, directoryPhone, email }) => {
  const link = email.split('@').shift()
  return (
    <li>
      <Link to={`/directory/person/${link}`}>
        <ShortPersonName>
          {firstName} {lastName}
        </ShortPersonName>
      </Link>
      {directoryPhone && <ShortPersonPhone>{directoryPhone}</ShortPersonPhone>}
    </li>
  )
}

class DirectoryForm extends React.Component {
  state = {
    search: false,
    query: false,
  }

  handleChange(event) {
    const { directory } = this.props
    const query = event.target.value
    this.setState({
      query: query,
    })
    if (query.length < 3) {
      this.setState({
        search: false,
      })
      return
    }
    let search = []
    directory.forEach(person => {
      const { user } = person.node
      const name = `${user.firstName} ${user.lastName}`

      if (name.toLowerCase().search(query.toLowerCase()) > -1) {
        search.push(user)
      } else {
        if (
          query.length > 3 &&
          user.directoryPhone &&
          user.directoryPhone.replace(/\D/g, '').search(query) > -1
        ) {
          search.push(user)
        }
      }
    })
    this.setState({
      search: search,
    })
  }
  render() {
    const { search } = this.state
    return (
      <form method="get" action="/directory/search">
        <h2>Search people and departments</h2>
        <Flex flexWrap="wrap">
          <Box width={[1, 1, 3 / 4, 3 / 4]} px={2}>
            <InputText
              name="q"
              label="Search the directory"
              onChange={this.handleChange.bind(this)}
              huge
              hideLabel
            />
          </Box>
          <Box width={[1, 1, 1 / 4, 1 / 4]} px={2}>
            <Submit value="Search" huge nomargin />
          </Box>
        </Flex>
        {search && (
          <ShortPersonList>
            {search.map(result => (
              <ShortPersonListing key={result.email} {...result} />
            ))}
          </ShortPersonList>
        )}
      </form>
    )
  }
}

export default DirectoryPage

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
            directoryPhone
            email
          }
        }
      }
    }
  }
`
