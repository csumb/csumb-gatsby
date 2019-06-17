import React, { Component } from 'react'
import Byline from '../../../components/common/byline'

class BlockByline extends Component {
  state = {
    person: false,
  }

  componentDidMount() {
    if (!this.props.overrideauthor || this.props.hideAuthor) {
      return
    }
    fetch(
      `/directory/json/${this.props.overrideauthor.split('@').shift()}.json`
    )
      .then(response => {
        return response.json()
      })
      .then(person => {
        this.setState({
          person: person,
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
