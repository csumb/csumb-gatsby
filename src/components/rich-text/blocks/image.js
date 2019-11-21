import React from 'react'
import styled from '@emotion/styled'

const ImageElement = styled('img')`
  ${props => props.location === 'right' && `float: right;`}
  ${props => props.location === 'left' && `float: right;`}
  ${props =>
    props.location === 'center' && `margin-left: auto; margin-right: auto;`}
  ${props => props.location === 'large' && `width: 100%;`}
`

const ContentImageInline = ({ fields }) => (
  <ImageElement
    src={fields.image['en-US'].fields.file['en-US'].url}
    alt=""
    location={fields.location['en-US']}
  />
)

export { ContentImageInline }
