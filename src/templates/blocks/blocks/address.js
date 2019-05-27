import React, { Component } from 'react'
import styled from '@emotion/styled'

const Address = styled('address')`
  font-style: italic;
`
class BlockAddress extends Component {
  render() {
    const {
      address1,
      address2,
      address3,
      city,
      state,
      zip,
      phone,
      tty,
      fax,
    } = this.props
    return (
      <Address>
        {address1 && (
          <>
            {address1}
            <br />
          </>
        )}
        {address2 && (
          <>
            {address2}
            <br />
          </>
        )}
        {address3 && (
          <>
            {address3}
            <br />
          </>
        )}
        {city}, {state} &nbsp;
        {zip}
        {phone && (
          <>
            <br />
            <strong>Phone: </strong> {phone}
          </>
        )}
        {tty && (
          <>
            <br />
            <strong>TTY: </strong> {tty}
          </>
        )}
        {fax && (
          <>
            <br />
            <strong>Fax: </strong> {fax}
          </>
        )}
      </Address>
    )
  }
}

export default BlockAddress
