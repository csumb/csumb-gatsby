import React from 'react'
import { Flex, Box } from '@rebass/grid/emotion'
import BlockList from './list'
import BlockText from './text'
import BlockHeading from './heading'
import BlockButton from './button'
import BlockDocument from './document'
import BlockImage from './image'
import BlockQuote from './quote'
import BlockAddress from './address'
import BlockDefinitionList from './definition-list'
import BlockColumns from './columns'
import BlockVideo from './video'
import BlockHeroImage from './heroimage'
import { ContainerContext, containerStyle } from './container-context'

class Block extends React.Component {
  blockComponents = {
    text: BlockText,
    list: BlockList,
    heading: BlockHeading,
    heroimage: BlockHeroImage,
    button: BlockButton,
    definitionlist: BlockDefinitionList,
    document: BlockDocument,
    image: BlockImage,
    quote: BlockQuote,
    address: BlockAddress,
    columns: BlockColumns,
    video: BlockVideo,
  }

  render() {
    if (typeof this.blockComponents[this.props.type] === 'undefined') {
      return null
    }
    let BlockType = this.blockComponents[this.props.type]
    return (
      <ContainerContext.Provider value={containerStyle.wide}>
        <BlockType block={this.props.block} />
      </ContainerContext.Provider>
    )
  }
}
class Blocks extends React.Component {
  render() {
    let blocks = JSON.parse(this.props.blocks)
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
              <Flex flexWrap="wrap" />
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
