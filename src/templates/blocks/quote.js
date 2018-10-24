import React from 'react'
import { css } from 'emotion'

const Cite = props => {
  if (!props.source) {
    return null
  }
  return (
    <cite
      className={css`
        display: block;
      `}
    >
      {props.source}
    </cite>
  )
}

class BlockQuote extends React.Component {
  render() {
    return (
      <div
        className={css`
          padding-left: 1rem;
          margin-left: 1rem;
          border-left: 4px solid #000;
        `}
      >
        <blockquote>
          {this.props.block.data.quote}
          <Cite source={this.props.block.data.source} />
        </blockquote>
      </div>
    )
  }
}

export default BlockQuote
