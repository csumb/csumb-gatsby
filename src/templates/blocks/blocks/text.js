import React from 'react'
import filterCourses from './filter-courses'
import styled from '@emotion/styled'
import { ContainerContext, ContainerElement } from '../container-context'
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
      console.log(name)
      return (
        <LinkInspect to={attribs.href}>
          {domToReact(children, parserOptions)}
        </LinkInspect>
      )
    }
  },
}

const BlockText = ({ lead, text }) => (
  <ContainerContext.Consumer>
    {container => (
      <ContainerElement container={container}>
        <Paragraph lead={lead} container={container}>
          {parse(filterCourses(text), parserOptions)}
        </Paragraph>
      </ContainerElement>
    )}
  </ContainerContext.Consumer>
)

export default BlockText
