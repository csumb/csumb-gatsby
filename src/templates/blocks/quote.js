import React from 'react'
import styled from 'react-emotion'

const Cite = styled('cite')`
  display: block;
`

const Quote = styled('div')`
  padding-left: 1rem;
  margin-left: 1rem;
  border-left: 4px solid #000;
`

class BlockQuote extends React.Component {
  render() {
    return (
      <Quote>
        <blockquote>
          {this.props.block.data.quote}
          {this.props.block.data.source && (
            <Cite>{this.props.block.data.source}></Cite>
          )}
        </blockquote>
      </Quote>
    )
  }
}

export default BlockQuote
