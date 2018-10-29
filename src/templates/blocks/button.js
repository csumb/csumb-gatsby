import React from 'react'
import Button from 'components/button'
import { ContainerContext, ContainerElement } from './container-context'

class BlockButton extends React.Component {
  render() {
    return (
      <ContainerContext.Consumer>
        {container => (
          <ContainerElement container={container}>
            <Button href={this.props.block.data.url} buttonType="default">
              {this.props.block.data.text}
            </Button>
          </ContainerElement>
        )}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockButton
