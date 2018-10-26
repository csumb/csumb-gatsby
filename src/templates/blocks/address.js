import React from 'react'
import styled from 'react-emotion'

const Address = styled('div')`
  font-style: italic;
`
class BlockAddress extends React.Component {
  render() {
    const data = this.props.block.data
    return (
      <Address>
        <address>
          {data.address1 ? data.address1 : null}
          {data.address2 ? data.address2 : null}
          <br />
          {data.address3 ? data.address3 : null}
          <br />
          {data.city}, {data.state} &nbsp;
          {data.zip}
        </address>
      </Address>
    )
  }
}

export default BlockAddress
