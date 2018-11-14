import React from 'react'
//import styled from 'react-emotion'
import { ContainerContext, ContainerElement } from './container-context'

class BlockMap extends React.Component {
  componentDidMount() {
    console.log('mounted')
  }

  render() {
    //const { zoom, center, features } = this.props

    return (
      <ContainerContext.Consumer>
        {container => <ContainerElement container={container} />}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockMap
