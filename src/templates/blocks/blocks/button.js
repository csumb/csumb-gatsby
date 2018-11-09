import React from 'react'
import { ButtonLink } from 'components/button'
import { ContainerContext, ContainerElement } from './container-context'

class BlockButton extends React.Component {
  render() {
    const { url, text } = this.props
    return (
      <ContainerContext.Consumer>
        {container => (
          <ContainerElement container={container}>
            <ButtonLink to={url} buttonType="default">
              {text}
            </ButtonLink>
          </ContainerElement>
        )}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockButton
