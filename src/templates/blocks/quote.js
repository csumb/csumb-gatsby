import React from 'react'
import { css } from 'emotion'
import colors from '../../components/styles/colors'

const Cite = (props) => {
  if(!props.source) {
    return null
  }
  return (
    <cite className={css`
      display: block;
    `}>{props.source}</cite>
  )
}

class BlockQuote extends React.Component {

  render() {
    return (
      <div className={css`
        padding: 1rem;
        background: ${colors.tan.light}
      `}>
        <blockquote>
          {this.props.block.data.quote}
          <Cite source={this.props.block.data.source}/>
        </blockquote>
      </div>
    )
  }
}

export default BlockQuote