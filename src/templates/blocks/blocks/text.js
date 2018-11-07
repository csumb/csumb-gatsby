import React from 'react'
import filterCourses from './filter-courses'
import styled from 'react-emotion'
import { ContainerContext } from './container-context'

const Paragraph = styled('p')`
  ${props => props.container} ${props =>
    props.lead
      ? `
    font-size: 130%;
  `
      : ``};
`
class BlockText extends React.Component {
  render() {
    return (
      <ContainerContext.Consumer>
        {container => (
          <Paragraph
            lead={this.props.block.data.lead}
            container={container}
            dangerouslySetInnerHTML={{
              __html: filterCourses(this.props.block.data.text),
            }}
          />
        )}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockText
