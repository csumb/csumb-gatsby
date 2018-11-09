import React from 'react'
import styled from 'react-emotion'
import { ContainerContext } from './container-context'

const DefinitionList = styled('dl')`
  ${props => props.container} dt {
    font-weight: bold;
  }
`

class BlockDefinitionList extends React.Component {
  render() {
    const { list } = this.props
    return (
      <ContainerContext.Consumer>
        {container => (
          <DefinitionList container={container}>
            {list.map(item => (
              <>
                <dt>{item.term}</dt>
                <dd>{item.definition}</dd>
              </>
            ))}
          </DefinitionList>
        )}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockDefinitionList
