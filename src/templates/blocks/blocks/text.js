import React from 'react'
import styled from '@emotion/styled'
import parseHtml from '../parse-html'

const Paragraph = styled('p')`
  ${props =>
    props.lead
      ? `
    font-size: 130%;
  `
      : ``};
`

const BlockText = ({ lead, text }) => {
  if (!text) {
    return null
  }
  return (
    <Paragraph
      lead={lead}
      className={`paragraph ${lead ? 'paragraph-lead' : ''}`}
    >
      {parseHtml(text)}
    </Paragraph>
  )
}

export default BlockText
