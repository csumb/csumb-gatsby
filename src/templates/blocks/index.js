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
import BlockPathway from './blocks/pathway'
import BlockRelated from './blocks/related'
import BlockTable from './blocks/table'
import { ContainerContext, containerStyle } from './container-context'
import { css } from 'emotion'

class Block extends React.Component {
  blockComponents = {
    feed: BlockFeed,
    form: BlockForm,
    imagegrid: BlockImageGrid,
    map: BlockMap,
    pathway: BlockPathway,
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
  }

  render() {
    const { type, block, inColumn } = this.props
    if (typeof this.blockComponents[type] === 'undefined') {
      return null
    }
    let BlockType = this.blockComponents[type]
    const containerWidth = inColumn
      ? containerStyle.column
      : containerStyle.normal
    return (
      <ContainerContext.Provider value={containerWidth}>
        <BlockType {...block.data} uuid={block.uuid} />
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
    <Flex flexWrap="wrap" className={css(containerStyle.normal)}>
      {block.data.columns.map((width, key) => (
        <Box
          key={`column-${layout.id}-${key}`}
          width={[1, 1, width / 12, width / 12]}
          px={2}
        >
          {Array.isArray(layout._children[key + 1]) && (
            <>
              {layout._children[key + 1].map(blockId => (
                <>
                  {blocks[blockId.id] && (
                    <Block
                      key={blockId.id}
                      type={blocks[blockId.id].type}
                      block={blocks[blockId.id]}
                      inColumn
                    />
                  )}
                </>
              ))}
            </>
          )}
        </Box>
      ))}
    </Flex>
  )
}
const Blocks = ({ blocks }) => {
  blocks = JSON.parse(blocks)

  if (
    typeof blocks.layout === 'undefined' ||
    typeof blocks.layout.map === 'undefined'
  ) {
    return <div>Empty layout data</div>
  }
  return (
    <>
      {blocks.layout.map(layout => (
        <div key={layout.id}>
          {blocks.blocks[layout.id] && (
            <>
              {layout._children ? (
                <Columns layout={layout} blocks={blocks.blocks} />
              ) : (
                <Block
                  key={layout.id}
                  type={blocks.blocks[layout.id].type}
                  block={blocks.blocks[layout.id]}
                />
              )}
            </>
          )}
        </div>
      ))}
    </>
  )
}

export default Blocks
