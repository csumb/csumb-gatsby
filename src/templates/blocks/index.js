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
import { ContainerContext, containerStyle } from './blocks/container-context'

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
    if (typeof this.blockComponents[this.props.type] === 'undefined') {
      return null
    }
    let BlockType = this.blockComponents[this.props.type]
    return (
      <ContainerContext.Provider value={containerStyle.wide}>
        <BlockType {...this.props.block.data} uuid={this.props.block.uuid} />
      </ContainerContext.Provider>
    )
  }
}
class Blocks extends React.Component {
  render() {
    let { blocks } = this.props
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
            {layout._children ? (
              <Flex flexWrap="wrap">
                <Box />
              </Flex>
            ) : (
              <Block
                key={layout.id}
                type={blocks.blocks[layout.id].type}
                block={blocks.blocks[layout.id]}
              />
            )}
          </div>
        ))}
      </>
    )
  }
}
export default Blocks
