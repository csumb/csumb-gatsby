import React from 'react'
import styled from 'react-emotion'
import { ContainerContext, ContainerElement } from './container-context'
import VisuallyHidden from '@reach/visually-hidden'

const Callout = styled('div')`
  background: ${theme.colors.primary.darkest};
  color: ${theme.colors.white};
  padding: 0.5rem;
`

const CalloutHeader = styled('h3')`
  color: ${theme.colors.white};
`

class BlockCallout extends React.Component {
  render() {
    return (
      <ContainerContext.Consumer>
        {container => (
          <ContainerElement container={container}>
            <Callout>
              <CalloutHeader>{this.props.block.data.title}</CalloutHeader>
              <p>{this.props.block.data.text}</p>
              {this.props.block.data.url && (
                <Link to={this.props.block.data.url}>
                  Read more <VisuallyHidden>about this message</VisuallyHidden>
                </Link>
              )}
            </Callout>
          </ContainerElement>
        )}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockCalendar
