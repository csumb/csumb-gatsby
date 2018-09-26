import React from 'react'
import { css } from 'emotion'

class BlockImage extends React.Component {

  render() {
    let imageClass = {}
    if(this.props.block.data.pullRight) {
      imageClass.float = 'right'
    }
    const imageClassName = css(imageClass)
    return (
      <div className={imageClassName}>
        <img className={css`
          width: 100%;
        `} src={this.props.block.data.image.url} alt={this.props.block.data.description}/>
      </div>
    )
  }
}

export default BlockImage