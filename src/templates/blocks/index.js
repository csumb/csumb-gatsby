import React from 'react'
import BlockList from './list'
import BlockText from './text'
import { css } from 'emotion'
import _ from 'lodash'


class Block extends React.Component {

  blockComponents = {
    text: BlockText,
    list: BlockList
  };

  render() {
    const BlockType = this.blockComponents[this.props.type]
    console.log(BlockType)
    return (
      <BlockType block={this.props.block}/>
    )
  }
}
class Blocks extends React.Component {

  render() {
    let blocks = JSON.parse(this.props.blocks)
    console.log(blocks)
    return(
      <div>
        {blocks.layout.map((layout) => (
          <div className={css(``)} key={layout.id}>
            <Block type={blocks.blocks[layout.id].type} block={blocks.blocks[layout.id]}/>
          </div>
        ))}
      </div>
    )
  }
}
export default Blocks