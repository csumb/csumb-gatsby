import React from 'react'
import styled from '@emotion/styled'

const Address = styled('address')`
  font-style: italic;
`
class BlockAddress extends React.Component {
  render() {
    const { address1, address2, address3, city, state, zip } = this.props
    return (
      <Address>
        {address1 ? (
          <>
            {address1}
            <br />
          </>
        ) : null}
        {address2 ? (
          <>
            {address2}
            <br />
          </>
        ) : null}
        {address3 ? (
          <>
            {address3}
            <br />
          </>
        ) : null}
        {city}, {state} &nbsp;
        {zip}
      </Address>
    )
  }
}

export default BlockAddress
