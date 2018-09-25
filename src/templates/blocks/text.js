import React from 'react'

class BlockText extends React.Component {
  
  createMarkup(text) {
    return {
      __html: text
    }
  }

  render() {
    return (
      <p dangerouslySetInnerHTML={this.createMarkup(this.props.block.data.text)}/>
    )
  }
}

export default BlockText