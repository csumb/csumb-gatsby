import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/site-header'
import styled from 'react-emotion'
import { InputText, Submit } from 'components/forms'
import Container from 'components/container'
import Link from 'gatsby-link'
import { Box, Flex } from '@rebass/grid/emotion'
import { navigate } from '@reach/router'

const DirectoryPage = () => (
  <Layout>
    <SiteHeader path="/directory">Directory</SiteHeader>
    <Container>
      <DirectoryForm />
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

const ShortPersonListing = props => (
  <li>
    <Link to={`/directory/person/${props.external_id}`}>
      <ShortPersonName>
        {props.given_name} {props.family_name}
      </ShortPersonName>
    </Link>
    {props.phone && <ShortPersonPhone>{props.phone}</ShortPersonPhone>}
  </li>
)

class DirectoryForm extends React.Component {
  state = {
    search: false,
    query: false,
  }
  handleSubmit(event) {
    event.preventDefault()
    navigate(`/directory/search?q=${this.state.query}`)
  }

  handleChange(event) {
    const query = event.target.value
    this.setState({
      query: query,
    })
    if (query.length < 4) {
      this.setState({
        search: false,
      })
      return
    }
    const data = {
      engine_key: '8MdTPLsyGLNeTpxVBD9e',
      q: query,
      document_types: ['person'],
    }
    fetch(
      'https://search-api.swiftype.com/api/v1/public/engines/suggest.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data),
      }
    )
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
        {search && (
          <ShortPersonList>
            {search.records.person.map(result => (
              <ShortPersonListing key={result.external_id} {...result} />
            ))}
          </ShortPersonList>
        )}
      </form>
    )
  }
}

export default DirectoryPage
