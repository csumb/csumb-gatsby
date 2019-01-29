import React from 'react'
import { Flex, Box } from '@rebass/grid/emotion'
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
import BlockByline from './blocks/byline'
import BlockHeroImage from './blocks/hero-image'
import BlockSound from './blocks/sound'
import BlockFeed from './blocks/feed'
import BlockForm from './blocks/form'
import BlockImageGrid from './blocks/image-grid'
import BlockMap from './blocks/map'
import BlockRelated from './blocks/related'
import BlockTable from './blocks/table'
import BlockPerson from './blocks/person'
import BlockEvent from './blocks/event'
import BlockEventFeed from './blocks/event-feed'
import { ContainerContext, containerStyle } from './container-context'
import { css } from 'emotion'
import VisuallyHidden from 'components/visually-hidden'

class Block extends React.Component {
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
    byline: BlockByline,
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
  }

  render() {
    const { type, block, inColumn, hidden, headerHandler } = this.props
    if (typeof this.blockComponents[type] === 'undefined') {
      return null
    }
    let BlockType = this.blockComponents[type]
    const containerWidth = inColumn
      ? containerStyle.column
      : containerStyle.normal
    return (
      <ContainerContext.Provider value={containerWidth}>
        {hidden ? (
          <VisuallyHidden>
            <BlockType
              {...block.data}
              uuid={block.uuid}
              headerHandler={headerHandler}
            />
          </VisuallyHidden>
        ) : (
            <BlockType
              {...block.data}
              uuid={block.uuid}
              headerHandler={headerHandler}
            />
          )}
      </ContainerContext.Provider>
    )
  }
}

const Columns = ({ layout, blocks }) => {
  const block = blocks[layout.id]
  if (typeof block.data.columns === 'undefined') {
    return <></>
  }
  return (
    <Flex flexWrap="wrap" className={css(containerStyle.full)}>
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
                    />
                  )}
                </React.Fragment>
              ))}
            </>
          )}
        </Box>
      ))}
    </Flex>
  )
}
class Blocks extends React.Component {
  state = {
    expandedBlocks: [],
  }

  constructor(props) {
    super(props)
    let { blocks } = props
    blocks = JSON.parse(blocks)
    this.blocks = blocks
    this.addBlockRelationships()
  }

  addBlockRelationships() {
    let lastHeader = false
    let lastSize = 0
    this.blocks.layout.map(layout => {
      const block = this.blocks.blocks[layout.id]
      if (!this.blocks.blocks[layout.id]) {
        return lastHeader
      }
      if (
        block.type === 'heading' &&
        lastHeader &&
        lastSize &&
        lastSize < block.data.level
      ) {
        this.blocks.blocks[layout.id]._collapsedHeader = lastHeader
      }
      if (block.type === 'heading' && block.data.collapsible) {
        lastHeader = layout.id
        lastSize = block.data.level
        return lastHeader
      }
      if (
        lastHeader &&
        block.type === 'heading' &&
        block.data.level === lastSize
      ) {
        lastHeader = false
        lastSize = 0
        return lastHeader
      }
      if (lastHeader) {
        this.blocks.blocks[layout.id]._collapsedHeader = lastHeader
        return lastHeader
      }
      return lastHeader
    })
  }

  handleCollapseHeader(event) { }

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
      <>
        {blocks.layout.map(layout => (
          <React.Fragment key={layout.id}>
            {blocks.blocks[layout.id] && (
              <>
                {layout._children ? (
                  <Columns layout={layout} blocks={blocks.blocks} />
                ) : (
                    <Block
                      key={layout.id}
                      type={blocks.blocks[layout.id].type}
                      block={blocks.blocks[layout.id]}
                      headerHandler={() => {
                        let { expandedBlocks } = this.state
                        const index = expandedBlocks.indexOf(layout.id)
                        if (index > -1) {
                          expandedBlocks.splice(index, 1)
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
      </>
    )
  }
}

export default Blocks
