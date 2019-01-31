import React from 'react'
import styled from 'styled-components'
import LinkInspect from 'components/link-inspect'
import { ContainerElement, containerStyle } from '../container-context'

const Cite = styled('cite')`
  display: block;
  margin-top: 1rem;
`

const Quote = styled('div')`
  ${props => props.container};
`

const Blockquote = styled('blockquote')``

class BlockQuote extends React.Component {
  render() {
    const { quote, source, url } = this.props
    return (
      <ContainerElement container={containerStyle.slightlyLarger}>
        <Quote>
          <Blockquote>
            {quote}
            {source && (
              <Cite>
                {url ? (
                  <LinkInspect to={url}>{source}</LinkInspect>
                ) : (
                  <>{source}</>
                )}
              </Cite>
            )}
          </Blockquote>
        </Quote>
      </ContainerElement>
    )
  }
}

export default BlockQuote
