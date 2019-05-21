import React, { Component } from 'react'
import Byline from 'components/pages/news/byline'

class BlockByline extends Component {
  state = {
    person: false,
  }

  componentDidMount() {
    if (!this.props.overrideauthor || this.props.hideAuthor) {
      return
    }
    fetch(
      `/page-data/directory/person/${this.props.overrideauthor
        .split('@')
        .shift()}/page-data.json`
    )
      .then(response => {
        return response.json()
      })
      .then(person => {
        this.setState({
          person: person.pageContext.user,
        })
      })
      .catch(() => {
        this.setState({
          person: false,
        })
      })
  }

  render() {
    return <Byline person={this.state.person}>{this.props.dateFormat}</Byline>
  }
}

export default BlockByline
