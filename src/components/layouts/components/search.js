import React from 'react'
//import { css } from 'emotion'
import Link from 'gatsby-link'
import SROnly from '../../../components/utilities/sronly'
import { navigate } from '@reach/router'
import { css } from 'emotion'


class Search extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      search: false,
      query: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      query: event.target.value.trim()
    })
    if(!event.target.value.trim().length || event.target.value.trim().length < 3) {
      this.setState({
        search: false
      });
    }
    window.fetch(`https://api.swiftype.com/api/v1/public/engines/suggest?engine_key=${this.props.swiftypeId}&q=${event.target.value.trim().toLowerCase()}`).then(response => {
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

  handleSubmit(event) {
    event.preventDefault()
    navigate(`/search?q=${this.state.query}`)
  }
  
  render() {
    
    const SearchResults = (props) => {
      if(!props.search || !props.search.record_count) {
        return null
      }
      return (
        <div>
        {props.search.records.page.map(item => (
          <div key={item.id}>
            <Link to={item.url.replace('https://csumb.edu', '')}>{item.title}</Link>
          </div>
        ))}
        </div>
      )
    }

    return (
      <form onSubmit={this.handleSubmit} className={css`
        margin-left: 1rem;
        display: inline-block;
        `}>
        <input type="text" onChange={this.handleChange} placeholder="Search"/>
        <SearchResults search={this.state.search}/>
        <SROnly>
          <input type="submit" value="Search"/>
        </SROnly>
      </form>
    )
  }
}

export default Search
