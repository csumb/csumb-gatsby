import React, { Component } from 'react'
import { Layout, PageTitle } from '../components/layouts/default'
import { navigate } from '@reach/router'
import url from 'url'
import { Flex, Box } from '../components/common/grid'
import { LeadParagraph } from '../components/common/type'
import { InputText, Submit } from '../components/common/forms'
import Container from '../components/common/container'
import styled from '@emotion/styled'

const SearchDescription = styled('p')`
  em {
    font-weight: bold;
    font-style: normal;
  }
`

const SearchResult = styled('div')`
  margin-top: 1rem;
  h3 {
    margin-bottom: 0.5rem;
  }
`

const Feedback = styled('p')`
  padding: 0 8px;
  font-size: 0.85rem;
`

const SearchNoResults = () => (
  <LeadParagraph>Sorry, no pages were found</LeadParagraph>
)

const ListResults = ({ results }) => {
  if (
    typeof results.records === 'undefined' ||
    typeof results.records.page === 'undefined'
  ) {
    return null
  }
  if (results.records.page && results.records.page.length === 0) {
    return <SearchNoResults />
  }
  return (
    <>
      {results.records.page.map(result => (
        <SearchResult key={result.id}>
          <h3>
            <a href={result.url.replace('https://csumb.edu/', '/')}>
              {result.title}
            </a>
          </h3>
          <div>
            <a href={result.url.replace('https://csumb.edu/', '/')}>
              {result.url}
            </a>
          </div>
          {result.highlight && result.highlight.body && (
            <SearchDescription
              dangerouslySetInnerHTML={{
                __html: result.highlight.body
                  .replace('This app works best with JavaScript enabled.', '')
                  .replace('Skip to content', ''),
              }}
            />
          )}
        </SearchResult>
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
          <Feedback>
            Results not what you expected?{' '}
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSdD1Lr509xObwDuJO-54KxRKClvyY5rViFFmbvPAxEJ5Mc4Ag/viewform">
              Leave us feedback
            </a>
          </Feedback>
          <ListResults results={this.state.search} />
        </Container>
      </Layout>
    )
  }
}

export default SearchPage
