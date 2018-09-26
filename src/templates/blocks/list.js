import React from 'react'

class BlockList extends React.Component {

  createMarkup(text) {
    return {
      __html: text
    }
  }
  
  render() {
    const ListTag = this.props.block.data.type
    return (
      <ListTag>
        {this.props.block.data.list.map((item, key) => (
          <li dangerouslySetInnerHTML={this.createMarkup(item.text)} key={key}>
          </li>
        ))}
      </ListTag>
    )
  }
}

export default BlockList