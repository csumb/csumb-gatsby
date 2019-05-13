import React, { Component } from 'react'
import styled from '@emotion/styled'
import LinkInspect from 'components/utilities/link-inspect'
import parseHtml from '../parse-html'
import { Flex, Box } from 'components/common/grid'
import quoteIcon from 'assets/images/quote.svg'

const Quote = styled('blockquote')`
  font-size: 1.3rem;
`

const Cite = styled('cite')`
  display: block;
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 700;
  font-style: normal;
`

const QuoteIcon = styled('img')`
  max-width: 50px;
`

class BlockQuote extends Component {
  render() {
    const { quote, source, url } = this.props
    return (
      <Quote>
        <Flex flexWrap="wrap">
          <Box width={2 / 12} pr={2}>
            <QuoteIcon src={quoteIcon} alt="" />
          </Box>
          <Box width={10 / 12}>
            <div>{parseHtml(quote)}</div>
            {source && (
              <Cite>
                {'— '}
                {url ? (
                  <LinkInspect to={url}>{source}</LinkInspect>
                ) : (
                  <>{source}</>
                )}
              </Cite>
            )}
          </Box>
        </Flex>
      </Quote>
    )
  }
}

export default BlockQuote
