import React from 'react'
import styled from 'react-emotion'
import { ContainerContext } from './container-context'

class BlockHeading extends React.Component {
  render() {
    let HeadingTag = styled(`h${this.props.block.data.level}`)`
      ${props => props.container};
    `
    return (
      <ContainerContext.Consumer>
        {container => (
          <HeadingTag container={container}>
            {this.props.block.data.text}
          </HeadingTag>
        )}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockHeading
