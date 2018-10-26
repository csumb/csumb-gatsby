import React from 'react'
import filterCourses from './filter-courses'
import styled from 'react-emotion'

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
    return (
      <Paragraph
        lead={this.props.block.data.lead}
        dangerouslySetInnerHTML={{
          __html: filterCourses(this.props.block.data.text),
        }}
      />
    )
  }
}

export default BlockText
