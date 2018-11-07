import React from 'react'
import styled from 'react-emotion'
import { ContainerContext, ContainerElement } from './container-context'

const Byline = styled('p')``

class BlockByline extends React.Component {
  render() {
    return (
      <ContainerContext.Consumer>
        {container => (
          <ContainerElement container={container}>
            <Byline>{this.props.blocks.data.dateFormat}</Byline>
          </ContainerElement>
        )}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockByline
