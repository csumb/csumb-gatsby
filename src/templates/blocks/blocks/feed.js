import React from 'react'
import styled from '@emotion/styled'
import LinkInspect from 'components/link-inspect'
import { Flex, Box } from '@rebass/grid/emotion'

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
      <>
        {title && <h3>{title}</h3>}
        <FeedList>
          {items.map(item => (
            <FeedItem>
              {displayShort ? (
                <LinkInspect to={item.page_link}>{item.title}</LinkInspect>
              ) : (
                <Flex flexWrap="wrap">
                  <Box width={[1, 3 / 4]} pr={[0, 3]}>
                    <FeedItemHeader>
                      <LinkInspect
                        to={item.page_link}
                        dangerouslySetInnerHTML={{ __html: item.title }}
                      />
                    </FeedItemHeader>

                    <FeedItemTeaser
                      dangerouslySetInnerHTML={{ __html: item.teaser }}
                    />
                  </Box>
                  <Box width={[1, 1 / 4]}>
                    {item.image && (
                      <img
                        src={item.image.replace('csumb.edu', 'edit.csumb.edu')}
                        alt=""
                      />
                    )}
                  </Box>
                </Flex>
              )}
            </FeedItem>
          ))}
        </FeedList>
      </>
    )
  }
}

export default BlockFeed
