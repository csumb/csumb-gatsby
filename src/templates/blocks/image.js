import React from 'react'
import { css } from 'emotion'

class BlockImage extends React.Component {

  render() {
    return (
      <img src={this.props.block.data.image.url} alt={this.props.block.data.description}/>
    )
  }
}

export default BlockImage