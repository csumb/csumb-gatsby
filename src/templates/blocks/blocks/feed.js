import React, { Component } from 'react'
import styled from '@emotion/styled'
import LinkInspect from '../../../components/utilities/link-inspect'
import { Flex, Box } from '../../../components/common/grid'
import { Button } from '../../../components/common/button'

const FeedList = styled.ul`
  list-style-type: none;
  margin: 0;
`

const FeedItemHeader = styled.h3``

const FeedItemTeaser = styled.p``

class BlockFeed extends Component {
  state = {
    showAll: false,
  }

  render() {
    const { title, displayShort, showMore } = this.props
    const { showAll } = this.state
    const limit = this.props.limit ? this.props.limit : 5
    let { items } = this.props
    return (
      <>
        {title && <h3>{title}</h3>}
        <FeedList>
          {items.map((item, key) => (
            <React.Fragment key={key}>
              {(showAll || key <= limit) && (
                <li>
                  {displayShort ? (
                    <LinkInspect to={item.page_link}>{item.title}</LinkInspect>
                  ) : (
                    <Flex>
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
                            src={item.image.replace(
                              'csumb.edu',
                              'edit.csumb.edu'
                            )}
                            alt=""
                          />
                        )}
                      </Box>
                    </Flex>
                  )}
                </li>
              )}
            </React.Fragment>
          ))}
        </FeedList>
        {showMore && (
          <Button
            onClick={event => {
              event.preventDefault()
              this.setState({
                showAll: !showAll,
              })
            }}
          >
            {showAll ? <>Hide items</> : <>Show more</>}
          </Button>
        )}
      </>
    )
  }
}

export default BlockFeed
