import React from 'react'

class BlockList extends React.Component {

  createMarkup(text) {
    return {
      __html: text
    }
  }
  
  render() {
    const listType = this.props.block.data.type
    return (
      <ul>
        {this.props.block.data.list.map((item) => (
          <li dangerouslySetInnerHTML={this.createMarkup(item.text)}>
          </li>
        ))}
      </ul>
    )
  }
}

export default BlockList