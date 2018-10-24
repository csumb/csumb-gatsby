import React from 'react'
//import { css } from 'emotion'
import Link from 'gatsby-link'
import VisuallyHidden from "@reach/visually-hidden";
import { navigate } from '@reach/router'
import { css } from 'emotion'
import { InputText } from '../../forms'

class SearchResults extends React.Component {

  render () {
    if(!this.props.search || !this.props.search.record_count) {
      return null
    }
    return (
      <div>
        {this.props.search.records.page.map(item => (
          <div key={item.id}>
            <Link className={css`
              color: #fff;
              text-decoration: none;
            `} to={item.url.replace('https://csumb.edu', '')}>{item.title}</Link>
          </div>
        ))}
      </div>
    )
  }
}
class Search extends React.Component {

  inputRef = React.createRef();

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

  componentDidUpdate() {
    if(this.props.show) {
      this.inputRef.current.focus()
    }
  }
  
  render() {
    return (
      <>
        <InputText name="search" label="Search" hideLabel={true}/>  
        <SearchResults search={this.state.search}/>
        <VisuallyHidden>
          <input type="submit" value="Search"/>
        </VisuallyHidden>
      </>
    )
  }
}

export default Search
