import React from 'react'
import styled from '@emotion/styled'
import LinkInspect from 'components/link-inspect'
import { ContainerElement, ContainerContext } from '../container-context'
import bp from 'style/breakpoints'

const Cite = styled('cite')`
  display: block;
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 700;
  font-style: normal;
`

const Quote = styled('div')`
  ${props => props.container};
`

const Blockquote = styled('blockquote')`
  font-size: 1.3rem;
  ${bp({
    padding: ['0 0.5rem', '0 1rem', '0 3.5rem'],
  })}
`

class BlockQuote extends React.Component {
  render() {
    const { quote, source, url } = this.props
    return (
      <Quote>
        <Blockquote>
          <div dangerouslySetInnerHTML={{ __html: quote }} />
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
    )
  }
}

export default BlockQuote
