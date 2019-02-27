import React from 'react'
import styled from '@emotion/styled'
import LinkInspect from 'components/link-inspect'
import { ContainerElement, ContainerContext } from '../container-context'
import bp from 'style/breakpoints'

const FeedItem = styled('li')``
const FeedList = styled('ul')`
  list-style-type: none;
  margin: 0;
`

const FeedItemHeader = styled('h3')``

const FeedItemTeaser = styled('p')``

const FeedItemImage = styled('img')`
  ${bp({
    width: ['100%', '30%'],
    float: ['none', 'right'],
    margin: ['1rem 0', '0 0 0.5rem 0.5rem'],
  })}
`

class BlockFeed extends React.Component {
  render() {
    const { limit, title, displayShort } = this.props
    let { items } = this.props
    items.splice(limit, items.length)
    return (
      <ContainerContext.Consumer>
        {container => (
          <ContainerElement container={container}>
            {title && <h3>{title}</h3>}
            <FeedList>
              {items.map(item => (
                <FeedItem>
                  {displayShort ? (
                    <LinkInspect to={item.page_link}>{item.title}</LinkInspect>
                  ) : (
                    <>
                      <FeedItemHeader>
                        <LinkInspect
                          to={item.page_link}
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        />
                      </FeedItemHeader>
                      {item.image && <FeedItemImage src={item.image} alt="" />}
                      <FeedItemTeaser
                        dangerouslySetInnerHTML={{ __html: item.teaser }}
                      />
                    </>
                  )}
                </FeedItem>
              ))}
            </FeedList>
          </ContainerElement>
        )}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockFeed
