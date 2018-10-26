import React from 'react'
import styled from 'react-emotion'

const Document = styled('a')`
  font-weight: bold;
`

class BlockDocument extends React.Component {
  render() {
    return (
      <Document href={this.props.block.data.document.url}>
        {this.props.block.data.name}
      </Document>
    )
  }
}

export default BlockDocument
