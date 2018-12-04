import React from 'react'
import Layout from 'components/layouts/default'
import Link from 'gatsby-link'
import { css } from 'emotion'
import { graphql } from 'gatsby'
import { navigate } from '@reach/router'
import url from 'url'
import { Flex, Box } from '@rebass/grid/emotion'
import { InputText, Submit } from 'components/forms'
import PageTitle from 'components/page-title'
import Container from 'components/container'

const ListResults = ({ results }) => {
  if (
    typeof results.records === 'undefined' ||
    typeof results.records.page === 'undefined'
  ) {
    return null
  }
  return (
    <>
      {results.records.page.map(result => (
        <div
          key={result.id}
          className={css`
            margin-top: 1rem;
          `}
        >
          <h3>
            <Link to={result.url.replace('https://csumb.edu/', '/')}>
              {result.title}
            </Link>
          </h3>
          <div>
            <Link to={result.url.replace('https://csumb.edu/', '/')}>
              {result.url}
            </Link>
          </div>
          <p
            className={css`
              em {
                font-weight: bold;
                font-style: normal;
              }
            `}
            dangerouslySetInnerHTML={{ __html: result.highlight.body }}
          />
        </div>
      ))}
    </>
  )
}
class SearchPage extends React.Component {
  constructor(props) {
    super(props)

    let state = {
      search: false,
      query: '',
      existingQuery: false,
    }
    this.existingQuery = null
    if (typeof window !== 'undefined') {
      let location = url.parse(window.location.href, true)
      if (location.query && typeof location.query.q !== 'undefined') {
        state.query = location.query.q
        state.existingQuery = state.query
        this.search(state.query)
      }
    }

    this.state = state
  }

  handleSubmit(event) {
    event.preventDefault()
    navigate(`?q=${this.state.query}`)

    this.search(this.state.query)
  }

  search(query) {
    window
      .fetch(
        `https://api.swiftype.com/api/v1/public/engines/search?engine_key=${
          this.props.data.site.siteMetadata.swiftypeId
        }&q=${query.trim().toLowerCase()}`
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
        this.setState({
          search: false,
        })
      })
  }

  handleChange(event) {
    this.setState({
      query: event.target.value,
    })
  }

  render() {
    const { existingQuery } = this.state
    return (
      <Layout pageTitle="Search">
        <Container>
          <PageTitle>Search</PageTitle>
          <form onSubmit={this.handleSubmit}>
            <Flex flexWrap="wrap">
              <Box width={[1, 2 / 3]} px={2}>
                <InputText
                  name="search"
                  label="Search"
                  huge
                  hideLabel
                  placeholder="Search"
                  onChange={this.handleChange.bind(this)}
                  value={existingQuery ? existingQuery : null}
                />
              </Box>
              <Box width={[1, 1 / 3]} px={2}>
                <Submit value="Search" huge nomargin />
              </Box>
            </Flex>
          </form>
          <ListResults results={this.state.search} />
        </Container>
      </Layout>
    )
  }
}

export default SearchPage

export const query = graphql`
  {
    site {
      siteMetadata {
        swiftypeId
      }
    }
  }
`
