import React from 'react'
import { ButtonLink } from 'components/button'
import { ContainerContext, ContainerElement } from '../container-context'
import styled from '@emotion/styled'

const ButtonContainer = styled(ContainerElement)`
  margin-bottom: 1.5rem;
`

class BlockButton extends React.Component {
  render() {
    const { url, text } = this.props
    return (
      <ContainerContext.Consumer>
        {container => (
          <ButtonContainer container={container}>
            <ButtonLink to={url} buttonType="default">
              {text}
            </ButtonLink>
          </ButtonContainer>
        )}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockButton
