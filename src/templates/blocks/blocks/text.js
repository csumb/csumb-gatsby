import React from 'react'
import filterCourses from './filter-courses'
import styled from '@emotion/styled'
import { ContainerContext, ContainerElement } from '../container-context'

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
    <ContainerContext.Consumer>
      {container => (
        <ContainerElement container={container}>
          <Paragraph
            lead={lead}
            dangerouslySetInnerHTML={{
              __html: filterCourses(text),
            }}
          />
        </ContainerElement>
      )}
    </ContainerContext.Consumer>
  )
}

export default BlockText
