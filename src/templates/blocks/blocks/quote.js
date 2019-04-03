import React from 'react'
import styled from '@emotion/styled'
import LinkInspect from 'components/link-inspect'
import parseHtml from '../parse-html'
import { colors } from 'style/theme'
import { Flex, Box } from '@rebass/grid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'

const Cite = styled('cite')`
  display: block;
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 700;
  font-style: normal;
`

const QuoteIcon = styled(FontAwesomeIcon)`
  color: ${colors.muted.dark};
  font-size: 1.4rem;
`

class BlockQuote extends React.Component {
  render() {
    const { quote, source, url } = this.props
    return (
      <blockquote>
        <Flex flexWrap="wrap">
          <Box width={1 / 12} pr={2}>
            <QuoteIcon icon={faQuoteLeft} />
          </Box>
          <Box width={11 / 12}>
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
      </blockquote>
    )
  }
}

export default BlockQuote
