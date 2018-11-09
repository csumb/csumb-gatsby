import React from 'react'
import styled from 'react-emotion'
import LinkInspect from 'components/link-inspect'
import { ContainerContext } from './container-context'

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
      <ContainerContext.Consumer>
        {container => (
          <Quote container={container}>
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
        )}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockQuote
