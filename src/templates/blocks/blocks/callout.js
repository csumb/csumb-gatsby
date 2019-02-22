import React from 'react'
import styled from '@emotion/styled'
import { colors } from 'style/theme'
import { ContainerContext, ContainerElement } from '../container-context'
import VisuallyHidden from 'components/visually-hidden'
import Link from 'gatsby-link'

const Callout = styled('div')`
  background: ${colors.primary.darkest};
  color: ${colors.white};
  padding: 0.5rem;
`

const CalloutHeader = styled('h3')`
  color: ${colors.white};
`

class BlockCallout extends React.Component {
  render() {
    const { title, text, url } = this.props
    return (
      <ContainerContext.Consumer>
        {container => (
          <ContainerElement container={container}>
            <Callout>
              <CalloutHeader>{title}</CalloutHeader>
              <p>{text}</p>
              {url && (
                <Link to={url}>
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

export default BlockCallout
