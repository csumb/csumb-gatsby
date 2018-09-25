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
    if(typeof this.blockComponents[this.props.type] === 'undefined') {
      return (
        <div>
          Block type doesn't exist
        </div>
      )
    }
    const BlockType = this.blockComponents[this.props.type]
    return (
      <BlockType block={this.props.block}/>
    )
  }
}
class Blocks extends React.Component {

  render() {
    let blocks = JSON.parse(this.props.blocks)
    if(typeof blocks.layout === 'undefined' || typeof blocks.layout.map === 'undefined') {
      return (
        <div>
          Empty layout data
        </div>
      )
    }
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