import React from 'react'
import styled from 'react-emotion'

const DefinitionList = styled('dl')`
  dt {
    font-weight: bold;
  }
`

class BlockDefinitionList extends React.Component {
  render() {
    return (
      <DefinitionList>
        {this.props.block.data.list.map(item => (
          <>
            <dt>{item.term}</dt>
            <dd>{item.definition}</dd>
          </>
        ))}
      </DefinitionList>
    )
  }
}

export default BlockDefinitionList
