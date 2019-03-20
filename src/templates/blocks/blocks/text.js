import React from 'react'
import styled from '@emotion/styled'
import LinkInspect from 'components/link-inspect'
import parse from 'html-react-parser'
import domToReact from 'html-react-parser/lib/dom-to-react'

const Paragraph = styled('p')`
  ${props =>
    props.lead
      ? `
    font-size: 130%;
  `
      : ``};
`

const parserOptions = {
  replace: ({ type, name, attribs, children }) => {
    if (type === 'tag' && name === 'a') {
      return (
        <LinkInspect to={attribs.href}>
          {domToReact(children, parserOptions)}
        </LinkInspect>
      )
    }
  },
}

const BlockText = ({ lead, text }) => {
  if (!text) {
    return null
  }
  return (
    <Paragraph lead={lead} container={container}>
      {parse(text, parserOptions)}
    </Paragraph>
  )
}

export default BlockText
