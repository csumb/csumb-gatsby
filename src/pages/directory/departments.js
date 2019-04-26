import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/layouts/sections/header/site-header'
import PageTitle from 'components/layouts/sections/header/page-title'
import styled from '@emotion/styled'
import Container from 'components/container'
import LinkInspect from 'components/link-inspect'
import Well from 'components/well'
import { graphql } from 'gatsby'
import { DirectoryNavigation } from 'components/pages/directory'
import { InputText, Submit } from 'components/forms'
import { Flex, Box } from '@rebass/grid/emotion'

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
const existingLetters = {}

const Letter = styled('a')`
  display: inline-block;
  margin-right: 0.5rem;
`

const DepartmentListingItem = styled('div')`
  margin-bottom: 1rem;
  h3 {
    margin-bottom: 0.3rem;
  }
  p {
    margin-bottom: 0;
  }
`

const DepartmentSearchResults = styled('div')`
  margin-top: 1rem;
`

const DepartmentListing = ({ department }) => (
  <DepartmentListingItem>
    <h3>
      {department.website ? (
        <LinkInspect to={department.website}>{department.name}</LinkInspect>
      ) : (
        <>{department.name}</>
      )}
    </h3>
    {department.email && (
      <p>
        <a href={`mailto:${department.email}`}>{department.email}</a>
      </p>
    )}
    {department.phone && <p>{department.phone}</p>}
  </DepartmentListingItem>
)

class DirectoryDepartmentSearchForm extends React.Component {
  state = {
    query: false,
    results: [],
  }

  handleSubmit(event) {
    event.preventDefault()
    const query = this.state.query.toLowerCase().trim()
    if (!query.length) {
      this.setState({
        results: false,
      })
      return
    }
    let results = []
    this.props.departments.map(department => {
      if (department.node.name.toLowerCase().search(query) > -1) {
        results.push(department.node)
      }
      return results
    })
    this.setState({
      results: results,
    })
  }

  render() {
    const { results } = this.state
    return (
      <Well>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <Flex flexWrap="wrap">
            <Box width={[1, 6 / 12]} pr={2}>
              <InputText
                name="search"
                label="Search departments"
                placeholder="Search"
                hideLabel={true}
                onChange={event => {
                  this.setState({
                    query: event.target.value,
                  })
                }}
              />
            </Box>
            <Box width={[1, 3 / 12]}>
              <Submit value="Search" nomargin small />
            </Box>
          </Flex>
        </form>
        {results.length ? (
          <DepartmentSearchResults>
            {results.map(department => (
              <DepartmentListing department={department} />
            ))}
          </DepartmentSearchResults>
        ) : null}
      </Well>
    )
  }
}

const DirectoryDepartmentPage = ({ data }) => {
  const addLetter = letter => {
    existingLetters[letter.toLowerCase()] = letter
  }
  return (
    <Layout>
      <SiteHeader path="/directory">Directory</SiteHeader>
      <DirectoryNavigation />
      <Container>
        <PageTitle>All departments</PageTitle>
        <DirectoryDepartmentSearchForm
          departments={data.allCsumbDepartment.edges}
        />
        <Well>
          {alphabet.map(letter => (
            <Letter href={`#letter-${letter}`}>{letter.toUpperCase()}</Letter>
          ))}
        </Well>
        {data.allCsumbDepartment.edges.map(department => (
          <React.Fragment key={department.node.id}>
            {!existingLetters[
              department.node.name.substr(0, 1).toLowerCase()
            ] && (
              <>
                {addLetter(department.node.name.substr(0, 1))}
                <h2
                  id={`letter-${department.node.name
                    .substr(0, 1)
                    .toLowerCase()}`}
                >
                  {department.node.name.substr(0, 1).toUpperCase()}
                </h2>
              </>
            )}
            <DepartmentListing department={department.node} />
          </React.Fragment>
        ))}
      </Container>
    </Layout>
  )
}

export default DirectoryDepartmentPage

export const query = graphql`
  {
    allCsumbDepartment(sort: { fields: name }) {
      edges {
        node {
          id
          name
          phone
          email
          website
        }
      }
    }
  }
`
