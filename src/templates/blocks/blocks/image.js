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

const BlockImage = ({
  image,
  description,
  height,
  caption,
  pullRight,
  credit,
  inColumn,
  url,
}) => {
  if (!image) {
    return null
  }
  const imageSource = image.key
    ? `https://${process.env.GATSBY_CLOUDFRONT_DOMAIN}/${image.key}`
    : image.url
        .replace('http://', 'https://')
        .replace('/csumb.edu/', '/edit.csumb.edu/')
  return (
    <ImageContainer
      pullRight={pullRight && !inColumn}
      className={`image ${pullRight && !inColumn ? 'float-right' : ''}`}
    >
      {url ? (
        <a href={url}>
          <img
            src={imageSource}
            alt={description.replace(/image/gi, '')}
            data-pull-right={pullRight}
            style={{
              height: height && parseInt(height) > 10 ? `${height}px` : 'auto',
              width: 'auto',
            }}
          />
        </a>
      ) : (
        <img
          src={imageSource}
          alt={description}
          style={{
            height: height && parseInt(height) > 10 ? `${height}px` : 'auto',
            width: 'auto',
          }}
        />
      )}
      {credit && (
        <Caption>
          <strong>Photo by:</strong> {credit}
        </Caption>
      )}
      {caption && <Caption>{caption}</Caption>}
    </ImageContainer>
  )
}

export default BlockImage
