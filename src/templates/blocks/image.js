import React from 'react'
import styled from 'react-emotion'

const Image = styled('img')`
  ${props => (props.pullRight ? ` float: right;` : ``)} img {
    width: 100%;
  }
`

class BlockImage extends React.Component {
  render() {
    return (
      <Image pullRight={this.props.block.data.pullRight}>
        <img
          src={this.props.block.data.image.url.replace('http://', 'https://')}
          alt={this.props.block.data.description}
        />
      </Image>
    )
  }
}

export default BlockImage
