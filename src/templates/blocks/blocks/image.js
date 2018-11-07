import React from 'react'
import styled from 'react-emotion'
import { ContainerContext } from './container-context'

const ImageContainer = styled('div')`
  img {
    width: 100%;
  }
  ${props => props.container} ${props =>
    props.pullRight ? ` float: right;` : ``};
`

class BlockImage extends React.Component {
  render() {
    return (
      <ContainerContext.Consumer>
        {container => (
          <ImageContainer
            container={container}
            pullRight={this.props.block.data.pullRight}
          >
            <img
              src={this.props.block.data.image.url.replace(
                'http://',
                'https://'
              )}
              alt={this.props.block.data.description}
            />
          </ImageContainer>
        )}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockImage
