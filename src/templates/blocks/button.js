import React from 'react'
import { ButtonLink } from 'components/button'
import { ContainerContext, ContainerElement } from './container-context'

class BlockButton extends React.Component {
  render() {
    return (
      <ContainerContext.Consumer>
        {container => (
          <ContainerElement container={container}>
            <ButtonLink href={this.props.block.data.url} buttonType="default">
              {this.props.block.data.text}
            </ButtonLink>
          </ContainerElement>
        )}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockButton
