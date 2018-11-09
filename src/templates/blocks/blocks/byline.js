import React from 'react'
import styled from 'react-emotion'
import theme from 'components/styles/theme'
import { ContainerContext, ContainerElement } from './container-context'

const Byline = styled('div')`
  background: ${theme.colors.muted.light};
  padding: 0.4rem;
  display: inline-block;
`

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
