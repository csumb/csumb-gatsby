import React from 'react'
import filterCourses from './filter-courses'
import styled from 'styled-components'
import { ContainerContext, ContainerElement } from '../container-context'

const Paragraph = styled('p')`
  ${props =>
    props.lead
      ? `
    font-size: 130%;
  `
      : ``};
`
class BlockText extends React.Component {
  render() {
    const { lead, text } = this.props
    return (
      <ContainerContext.Consumer>
        {container => (
          <ContainerElement container={container}>
            <Paragraph
              lead={lead}
              container={container}
              dangerouslySetInnerHTML={{
                __html: filterCourses(text),
              }}
            />
          </ContainerElement>
        )}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockText
