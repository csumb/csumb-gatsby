import React from 'react'
import { ContainerContext, ContainerElement } from '../container-context'
import Byline from 'components/byline'

class BlockByline extends React.Component {
  render() {
    return (
      <ContainerContext.Consumer>
        {container => (
          <ContainerElement container={container}>
            <Byline>{this.props.dateFormat}</Byline>
          </ContainerElement>
        )}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockByline
