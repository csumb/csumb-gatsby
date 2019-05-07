import React, { Component } from 'react'
import styled from '@emotion/styled'
import { Flex, Box } from '@rebass/grid/emotion'

const ImageGridHeader = styled('h3')`
  margin-top: 0;
`

const ImageGridImage = styled('img')`
  margin-bottom: 0.5rem;
`

const ImageGridItem = ({ item }) => (
  <>
    {item.image && (
      <ImageGridImage
        src={
          item.image.key
            ? `https://s3.amazonaws.com/csumb-uploads/${item.image.key}`
            : item.image.url.replace('/csumb.edu/', '/edit.csumb.edu/')
        }
        alt=""
      />
    )}
    <ImageGridHeader>{item.headline}</ImageGridHeader>
  </>
)

class BlockImageGrid extends Component {
  render() {
    const { images, columnWidth } = this.props
    return (
      <Flex flexWrap="wrap">
        {images.map(item => (
          <Box width={[1, 1, columnWidth / 12, columnWidth / 12]} px={2}>
            {item.link ? (
              <a href={item.link}>
                <ImageGridItem item={item} />
              </a>
            ) : (
              <ImageGridItem item={item} />
            )}
            {item.text && <p>{item.text}</p>}
          </Box>
        ))}
      </Flex>
    )
  }
}

export default BlockImageGrid
