import React, { Component } from 'react'
import { Flex, Box } from '../../components/common/grid'
import styled from '@emotion/styled'
import Container from '../../components/common/container'
import BlockList from './blocks/list'
import BlockText from './blocks/text'
import BlockHeading from './blocks/heading'
import BlockButton from './blocks/button'
import BlockDocument from './blocks/document'
import BlockImage from './blocks/image'
import BlockCalendar from './blocks/calendar'
import BlockQuote from './blocks/quote'
import BlockAddress from './blocks/address'
import BlockDefinitionList from './blocks/definition-list'
import BlockVideo from './blocks/video'
import BlockHeroImage from './blocks/hero-image'
import BlockSound from './blocks/sound'
import BlockFeed from './blocks/feed'
import BlockPathway from './blocks/pathway'
import BlockForm from './blocks/form'
import BlockImageGrid from './blocks/image-grid'
import BlockMap from './blocks/map'
import BlockRelated from './blocks/related'
import BlockTable from './blocks/table'
import BlockPerson from './blocks/person'
import BlockEvent from './blocks/event'
import BlockEventFeed from './blocks/event-feed'
import BlockSocial from './blocks/social'
import BlockHtml from './blocks/html'
import BlockGe from './blocks/ge'
import BlockCourses from './blocks/courses'

const CollapsePadding = styled.div`
  ${props => props.level && `margin-left: ${props.level}rem;`}
`

const CollapseWrapper = ({ inCollapsedHeader, children, level }) => {
  if (!inCollapsedHeader) {
    return <>{children}</>
  }
  return <CollapsePadding level={level}>{children}</CollapsePadding>
}

class Block extends Component {
  blockComponents = {
    feed: BlockFeed,
    form: BlockForm,
    imagegrid: BlockImageGrid,
    map: BlockMap,
    related: BlockRelated,
    table: BlockTable,
    text: BlockText,
    list: BlockList,
    heading: BlockHeading,
    calendar: BlockCalendar,
    heroimage: BlockHeroImage,
    button: BlockButton,
    definitionlist: BlockDefinitionList,
    document: BlockDocument,
    image: BlockImage,
    quote: BlockQuote,
    address: BlockAddress,
    video: BlockVideo,
    sound: BlockSound,
    person: BlockPerson,
    event: BlockEvent,
    eventfeed: BlockEventFeed,
    pathway: BlockPathway,
    social: BlockSocial,
    html: BlockHtml,
    ge: BlockGe,
    courses: BlockCourses,
  }

  render() {
    const {
      type,
      block,
      hidden,
      headerHandler,
      inCollapsedHeader,
      inColumn,
    } = this.props
    if (typeof this.blockComponents[type] === 'undefined' || hidden) {
      return null
    }
    let BlockType = this.blockComponents[type]
    return (
      <CollapseWrapper
        inCollapsedHeader={inCollapsedHeader}
        level={block._collapsedHeaderLevel}
        data-swiftype-index="true"
      >
        <BlockType
          {...block.data}
          uuid={block.uuid}
          headerHandler={headerHandler}
          inColumn={inColumn}
        />
      </CollapseWrapper>
    )
  }
}

class Columns extends Component {
  state = {
    expandedBlocks: [],
  }
  render() {
    const { layout, blocks, hidden, inCollapsedHeader } = this.props
    const block = blocks[layout.id]

    const { expandedBlocks } = this.state
    if (typeof block.data.columns === 'undefined' || hidden) {
      return <></>
    }
    return (
      <CollapseWrapper
        inCollapsedHeader={inCollapsedHeader}
        level={block._collapsedHeaderLevel}
      >
        <Flex>
          {block.data.columns.map((width, key) => (
            <Box
              width={[1, 1, width / 12, width / 12]}
              key={`column-${layout.id}-${key}`}
              px={2}
            >
              {Array.isArray(layout._children[key + 1]) && (
                <>
                  {layout._children[key + 1].map(blockId => (
                    <React.Fragment key={blockId.id}>
                      {blocks[blockId.id] && (
                        <Block
                          type={blocks[blockId.id].type}
                          block={blocks[blockId.id]}
                          inColumn
                          inCollapsedHeader={
                            blocks[blockId.id]._collapsedHeader
                          }
                          headerHandler={() => {
                            let { expandedBlocks } = this.state
                            const index = expandedBlocks.indexOf(blockId.id)
                            if (index > -1) {
                              expandedBlocks.splice(index, 1)
                              layout._children[key + 1].forEach(subLayout => {
                                const block = blocks[subLayout.id]
                                if (
                                  !block ||
                                  typeof block.data === 'undefined'
                                ) {
                                  return
                                }
                                if (
                                  block.type === 'heading' &&
                                  block._collapsedHeader === blockId.id
                                ) {
                                  const subIndex = expandedBlocks.indexOf(
                                    subLayout.id
                                  )
                                  expandedBlocks.splice(subIndex, 1)
                                }
                              })
                            } else {
                              expandedBlocks.push(blockId.id)
                            }

                            this.setState({
                              expandedBlocks: expandedBlocks,
                            })
                          }}
                          hidden={
                            blocks[blockId.id]._collapsedHeader &&
                            (!expandedBlocks.length ||
                              expandedBlocks.indexOf(
                                blocks[blockId.id]._collapsedHeader
                              ) === -1)
                          }
                        />
                      )}
                    </React.Fragment>
                  ))}
                </>
              )}
            </Box>
          ))}
        </Flex>
      </CollapseWrapper>
    )
  }
}

class Blocks extends Component {
  state = {
    expandedBlocks: [],
  }

  constructor(props) {
    super(props)
    let { blocks } = props
    this.blocks = JSON.parse(blocks)
    this.addBlockHeaderRelationships(this.blocks.layout)
  }

  addBlockHeaderRelationships(blockList) {
    let lastHeader = false

    const headerLevels = [4, 3, 2]

    headerLevels.forEach(headerLevel => {
      lastHeader = false
      const that = this
      blockList.forEach(layout => {
        const block = this.blocks.blocks[layout.id]
        if (!block || typeof block.data === 'undefined') {
          return
        }
        if (
          block.type === 'columns' &&
          typeof layout._children !== 'undefined'
        ) {
          Object.keys(layout._children).forEach(columnId => {
            that.addBlockHeaderRelationships(layout._children[columnId])
          })
        }
        const level = parseInt(block.data.level)
        if (
          block.type === 'heading' &&
          level === headerLevel &&
          block.data.collapsible
        ) {
          lastHeader = block.uuid
        } else {
          if (block.type === 'heading' && level <= headerLevel) {
            lastHeader = false
          } else {
            if (lastHeader && !block._collapsedHeader) {
              block._collapsedHeader = lastHeader
              block._collapsedHeaderLevel = headerLevel
            }
          }
        }
      })
    })
  }

  headerHandler(event) {}

  render() {
    const blocks = this.blocks
    const { expandedBlocks } = this.state

    if (
      typeof blocks.layout === 'undefined' ||
      typeof blocks.layout.map === 'undefined'
    ) {
      return null
    }
    return (
      <Container>
        {blocks.layout.map(layout => (
          <React.Fragment key={layout.id}>
            {blocks.blocks[layout.id] && (
              <>
                {layout._children ? (
                  <Columns
                    layout={layout}
                    blocks={blocks.blocks}
                    inCollapsedHeader={
                      blocks.blocks[layout.id]._collapsedHeader
                    }
                    hidden={
                      blocks.blocks[layout.id]._collapsedHeader &&
                      (!expandedBlocks.length ||
                        expandedBlocks.indexOf(
                          blocks.blocks[layout.id]._collapsedHeader
                        ) === -1)
                    }
                  />
                ) : (
                  <Block
                    key={layout.id}
                    type={blocks.blocks[layout.id].type}
                    block={blocks.blocks[layout.id]}
                    inCollapsedHeader={
                      blocks.blocks[layout.id]._collapsedHeader
                    }
                    headerHandler={() => {
                      let { expandedBlocks } = this.state
                      const index = expandedBlocks.indexOf(layout.id)
                      if (index > -1) {
                        expandedBlocks.splice(index, 1)
                        blocks.layout.forEach(subLayout => {
                          const block = this.blocks.blocks[subLayout.id]
                          if (!block || typeof block.data === 'undefined') {
                            return
                          }
                          if (
                            block.type === 'heading' &&
                            block._collapsedHeader === layout.id
                          ) {
                            const subIndex = expandedBlocks.indexOf(
                              subLayout.id
                            )
                            expandedBlocks.splice(subIndex, 1)
                          }
                        })
                      } else {
                        expandedBlocks.push(layout.id)
                      }

                      this.setState({
                        expandedBlocks: expandedBlocks,
                      })
                    }}
                    hidden={
                      blocks.blocks[layout.id]._collapsedHeader &&
                      (!expandedBlocks.length ||
                        expandedBlocks.indexOf(
                          blocks.blocks[layout.id]._collapsedHeader
                        ) === -1)
                    }
                  />
                )}
              </>
            )}
          </React.Fragment>
        ))}
      </Container>
    )
  }
}

export default Blocks
