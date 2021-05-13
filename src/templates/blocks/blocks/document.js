import React from 'react'
import styled from '@emotion/styled'

const Document = styled('a')`
  display: block;
  ${props => props.container} font-weight: bold;
  margin: 1rem 0;
`

const BlockDocument = ({ document, name }) => {
  if (!document.key && !document.url) {
    return null
  }
  const url = document.key
    ? `https://${process.env.GATSBY_CLOUDFRONT_DOMAIN}/${document.key}`
    : document.url.replace('/csumb.edu/', '/edit.csumb.edu/')
  return (
    <Document href={url}>
      <span
        style={{
          color: document.url.includes('csumb.edu') ? 'red' : '#0071bc',
        }}
      >
        {name}
      </span>
    </Document>
  )
}

export default BlockDocument
