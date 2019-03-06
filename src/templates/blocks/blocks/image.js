import React from 'react'
import styled from '@emotion/styled'
import { ContainerContext, ContainerElement } from '../container-context'

const ImageContainer = styled('div')`
  ${props => props.container} ${props =>
    props.pullRight ? ` float: right;` : ``};
`

class BlockImage extends React.Component {
  render() {
    const { image, description, height, pullRight, inColumn } = this.props
    if (!image || !image.url) {
      return null
    }
    return (
      <ContainerContext.Consumer>
        {container => (
          <ContainerElement container={container}>
            <ImageContainer pullRight={pullRight && !inColumn}>
              <img
                src={image.url.replace('http://', 'https://')}
                alt={description}
                style={{
                  height: height ? `${height}px` : 'auto',
                  width: 'auto',
                }}
              />
            </ImageContainer>
          </ContainerElement>
        )}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockImage
