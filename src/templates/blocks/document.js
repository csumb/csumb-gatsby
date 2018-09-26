import React from 'react'
import { css } from 'emotion'


class BlockDocument extends React.Component {

  render() {
    return (
      <a className={css`
        font-weight: bold;
      `} href={this.props.block.data.document.url}>
        {this.props.block.data.name}
      </a>
    )
  }
}

export default BlockDocument