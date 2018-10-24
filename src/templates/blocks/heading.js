import React from 'react'

class BlockHeading extends React.Component {
  render() {
    const HeadingTag = `h${this.props.block.data.level}`
    return <HeadingTag>{this.props.block.data.text}</HeadingTag>
  }
}

export default BlockHeading
