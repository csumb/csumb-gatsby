import React from 'react'
import styled from '@emotion/styled'
import LinkInspect from 'components/link-inspect'
import { ContainerContext, ContainerElement } from '../container-context'
import { Flex, Box } from '@rebass/grid/emotion'

const ImageGridHeader = styled('h3')`
  margin-top: 0;
`

const ImageGridImage = styled('img')`
  margin-bottom: 0.5rem;
`

class BlockImageGrid extends React.Component {
  render() {
    const { images, columnWidth } = this.props
    return (
      <ContainerContext.Consumer>
        {container => (
          <ContainerElement container={container}>
            <Flex flexWrap="wrap">
              {images.map(image => (
                <Box width={[1, 1, columnWidth / 12, columnWidth / 12]} px={2}>
                  <LinkInspect to={image.link}>
                    <ImageGridImage
                      src={`https://s3.amazonaws.com/csumb-uploads/${
                        image.image.key
                      }`}
                      alt=""
                    />
                    <ImageGridHeader>{image.headline}</ImageGridHeader>
                  </LinkInspect>
                  {image.text && <p>{image.text}</p>}
                </Box>
              ))}
            </Flex>
          </ContainerElement>
        )}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockImageGrid
