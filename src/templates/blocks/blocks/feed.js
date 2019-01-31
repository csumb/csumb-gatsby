import React from 'react'
import styled from 'styled-components'
import LinkInspect from 'components/link-inspect'
import { ContainerElement } from '../container-context'

const FeedItem = styled('li')``
const FeedList = styled('ul')`
  list-style-type: none;
  margin: 0;
`

const FeedItemHeader = styled('h3')``

const FeedItemTeaser = styled('p')``
class BlockFeed extends React.Component {
  render() {
    const { limit, title, displayShort } = this.props
    let { items } = this.props
    items.splice(limit, items.length)
    return (
      <ContainerElement isFull>
        {title && <h3>{title}</h3>}
        <FeedList>
          {items.map(item => (
            <FeedItem>
              {displayShort ? (
                <LinkInspect to={item.page_link}>{item.title}</LinkInspect>
              ) : (
                <>
                  <FeedItemHeader>
                    <LinkInspect to={item.page_link}>{item.title}</LinkInspect>
                  </FeedItemHeader>
                  <FeedItemTeaser>{item.teaser}</FeedItemTeaser>
                </>
              )}
            </FeedItem>
          ))}
        </FeedList>
      </ContainerElement>
    )
  }
}

export default BlockFeed
