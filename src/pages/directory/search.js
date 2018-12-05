import React from 'react'
import { Flex, Box } from '@rebass/grid/emotion'
import { InputText, Submit } from 'components/forms'
import { navigate } from '@reach/router'
import Container from 'components/container'
import Layout from 'components/layouts/default'
import url from 'url'
import Link from 'gatsby-link'
import SiteHeader from 'components/site-header'

const PersonListing = props => (
  <div>
    <h3>
      <Link to={`/directory/person/${props.external_id}`}>
        {props.given_name} {props.family_name}
      </Link>
    </h3>
  </div>
)

class DirectorySearchResults extends React.Component {
  state = {
    search: false,
    query: false,
  }
  componentDidMount() {
    let query = false
    let location = url.parse(window.location.href, true)
    if (location.query && typeof location.query.q !== 'undefined') {
      query = location.query.q
    }
    this.setState({
      query: query,
    })
    const data = {
      engine_key: '8MdTPLsyGLNeTpxVBD9e',
      q: query,
      document_types: ['person'],
      sort_field: { person: 'family_name' },
      sort_direction: { person: 'asc' },
    }
    fetch('https://search-api.swiftype.com/api/v1/public/engines/search.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        return response.json()
      })
      .then(search => {
        this.setState({
          search: search,
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
  render() {
    const { search } = this.state
    return (
      <>
        {search && (
          <>
            {search.records.person.map(result => (
              <PersonListing key={result.external_id} {...result} />
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
                  huge
                  hideLabel
                />
              </Box>
              <Box width={[1, 1, 1 / 4, 1 / 4]} px={2}>
                <Submit value="Search" huge nomargin />
              </Box>
            </Flex>
          </form>
          <DirectorySearchResults />
        </Container>
      </Layout>
    )
  }
}

export default DirectorySearchPage
