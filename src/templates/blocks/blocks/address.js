import React from 'react'
import styled from '@emotion/styled'

const Address = styled.address`
  font-style: italic;
`
const BlockAddress = props => {
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
  } = props
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

export default BlockAddress
