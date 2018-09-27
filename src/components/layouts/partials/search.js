import React from 'react'
//import { css } from 'emotion'
import Link from 'gatsby-link'


class Search extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      search: false
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
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
      <>
        <input type="text" onChange={this.handleChange}/>
        <SearchResults search={this.state.search}/>
      </>
    )
  }
}

export default Search
