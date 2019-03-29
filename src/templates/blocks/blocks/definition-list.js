import React from 'react'
import styled from '@emotion/styled'

const DefinitionList = styled('dl')`
  dt {
    font-weight: bold;
  }
`

class BlockDefinitionList extends React.Component {
  render() {
    const { list } = this.props
    return (
      <DefinitionList>
        {list.map(item => (
          <>
            <dt
              dangerouslySetInnerHTML={{
                __html: item.term,
              }}
            />
            <dd
              dangerouslySetInnerHTML={{
                __html: item.definition,
              }}
            />
          </>
        ))}
      </DefinitionList>
    )
  }
}

export default BlockDefinitionList
