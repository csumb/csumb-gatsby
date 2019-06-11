import React, { Component } from 'react'
import { Layout, PageTitle } from 'components/layouts/default'
import Link from 'gatsby-link'
import { css } from 'emotion'
import { navigate } from '@reach/router'
import url from 'url'
import { Flex, Box } from 'components/common/grid'
import { InputText, Submit } from 'components/common/forms'
import Container from 'components/common/container'

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
class SearchPage extends Component {
  state = {
    search: false,
    query: '',
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      let location = url.parse(window.location.href, true)
      if (location.query && typeof location.query.q !== 'undefined') {
        this.setState({
          query: location.query.q,
        })
        this.search(location.query.q)
      }
    }
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
          process.env.GATSBY_CSUMB_SWIFTYPE_ID
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
    const { query } = this.state
    return (
      <Layout pageTitle="Search">
        <Container>
          <PageTitle>Search</PageTitle>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <Flex>
              <Box width={[1, 2 / 3]} px={2}>
                <InputText
                  name="search"
                  label="Search"
                  huge
                  hideLabel
                  placeholder="Search"
                  onChange={this.handleChange.bind(this)}
                  value={query ? query : null}
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
