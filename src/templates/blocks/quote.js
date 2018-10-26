import React from 'react'
import styled from 'react-emotion'
import { ContainerContext } from './container-context'

const Cite = styled('cite')`
  display: block;
`

const Quote = styled('div')`
  ${props => props.container} padding-left: 1rem;
  margin-left: 1rem;
  border-left: 4px solid #000;
`

class BlockQuote extends React.Component {
  render() {
    return (
      <ContainerContext.Consumer>
        {container => (
          <Quote container={container}>
            <blockquote>
              {this.props.block.data.quote}
              {this.props.block.data.source && (
                <Cite>{this.props.block.data.source}></Cite>
              )}
            </blockquote>
          </Quote>
        )}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockQuote
