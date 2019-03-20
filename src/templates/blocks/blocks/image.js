import React from 'react'
import styled from '@emotion/styled'

const ImageContainer = styled('div')`
  ${props => props.container} ${props =>
    props.pullRight
      ? `
    float: right;
    margin: 0 0 0.5rem 0.5rem;
    width: 30%;
      `
      : ``};
  img {
    margin-bottom: 0;
  }
`

const Caption = styled('div')`
  font-style: italic;
  font-size: 0.8rem;
`

class BlockImage extends React.Component {
  render() {
    const {
      image,
      description,
      height,
      caption,
      pullRight,
      inColumn,
    } = this.props
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
        {caption && <Caption>{caption}</Caption>}
      </ImageContainer>
    )
  }
}

export default BlockImage
