import React from 'react'
import styled from 'react-emotion'
import { ContainerContext } from './container-context'

const Document = styled('a')`
  display: block;
  ${props => props.container} font-weight: bold;
`

class BlockDocument extends React.Component {
  render() {
    return (
      <ContainerContext.Consumer>
        {container => (
          <Document
            container={container}
            href={this.props.block.data.document.url}
          >
            {this.props.block.data.name}
          </Document>
        )}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockDocument
