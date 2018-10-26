import React from 'react'
import styled from 'react-emotion'

const ImageContainer = styled('img')`
  img {
    width: 100%;
  }
  ${props => (props.pullRight ? ` float: right;` : ``)};
`

class BlockImage extends React.Component {
  render() {
    return (
      <ImageContainer pullRight={this.props.block.data.pullRight}>
        <img
          src={this.props.block.data.image.url.replace('http://', 'https://')}
          alt={this.props.block.data.description}
        />
      </ImageContainer>
    )
  }
}

export default BlockImage
