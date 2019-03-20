import React from 'react'
import Byline from 'components/byline'

class BlockByline extends React.Component {
  render() {
    return <Byline>{this.props.dateFormat}</Byline>
  }
}

export default BlockByline
