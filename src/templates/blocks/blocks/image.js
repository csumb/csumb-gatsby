import React from 'react'
import styled from '@emotion/styled'

const ImageContainer = styled('div')`
  ${props => props.container} ${props =>
    props.pullRight ? ` float: right;` : ``};
  img {
    margin-bottom: 0;
  }
`

class BlockImage extends React.Component {
  render() {
    const { image, description, height, pullRight, inColumn } = this.props
    if (!image) {
      return null
    }
    const imageSource = image.key
      ? `https://s3.amazonaws.com/csumb-uploads/${image.key}`
      : image.url.replace('http://', 'https://')
    return (
      <ImageContainer pullRight={pullRight && !inColumn}>
        <img
          src={imageSource}
          alt={description}
          style={{
            height: height && parseInt(height) > 10 ? `${height}px` : 'auto',
            width: 'auto',
          }}
        />
      </ImageContainer>
    )
  }
}

export default BlockImage
