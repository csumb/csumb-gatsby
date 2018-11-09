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
    const { image, description, pullRight } = this.props
    return (
      <ContainerContext.Consumer>
        {container => (
          <ImageContainer container={container} pullRight={pullRight}>
            <img
              src={image.url.replace('http://', 'https://')}
              alt={description}
            />
          </ImageContainer>
        )}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockImage
