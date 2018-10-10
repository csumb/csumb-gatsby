import React from 'react'
import Layout from '../components/layouts/default'
import Link from 'gatsby-link'
import { css } from 'emotion'
import { graphql } from 'gatsby'
import { navigate } from '@reach/router'
import url from 'url'

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    
    let state = {
      search: false,
      query: ''
    }
    this.existingQuery = null
    if(typeof window !== 'undefined') {
      let location = url.parse(window.location.href, true)
      if(location.query && typeof location.query.q !== 'undefined') {
        state.query = location.query.q
        this.existingQuery = state.query
      }
    }

    this.state = state

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault()
    navigate(`?q=${this.state.query}`)

    window.fetch(`https://api.swiftype.com/api/v1/public/engines/search?engine_key=${this.props.data.site.siteMetadata.swiftypeId}&q=${this.state.query.trim().toLowerCase()}`).then(response => {
      return response.json()
    }).then(search => {
      this.setState({
        search: search
      })
    }).catch(error => {
      this.setState({
        search: false
      })
    })
  }

  handleChange(event) {
    this.setState({
      query: event.target.value
    });
  }

  render() {

    const ListResults = (props) => {
      if(typeof props.results.records === 'undefined' || typeof props.results.records.page === 'undefined') {
        return (null)
      }
      return (
        <>
        {props.results.records.page.map((result) => (
          <div  key={result.id} className={css`
            margin-top: 1rem;
          `}>
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
            <p>
              {result.highlight.body}
            </p>

          </div>
        ))}
        </>
      )
    }

    return (
      <Layout pageTitle="Search">
        <h1>Search</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Search" onChange={this.handleChange} value={this.existingQuery}/>
          <input type="submit" value="Search"/>
        </form>
        <ListResults results={this.state.search}/>
      </Layout>
    );
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