import React from 'react'
import styled from '@emotion/styled'

const Address = styled('address')`
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
        <span className="content-type-address--address1">
          {address1}
          <br />
        </span>
      )}
      {address2 && (
        <span className="content-type-address--address2">
          {address2}
          <br />
        </span>
      )}
      {address3 && (
        <span className="content-type-address--address3">
          {address3}
          <br />
        </span>
      )}
      <span className="content-type-address--city">{city}</span>,{' '}
      <span className="content-type-address--state">{state}</span> &nbsp;
      <span className="content-type-address--zip">{zip}</span>
      {phone && (
        <>
          <br />
          <strong>Phone: </strong>{' '}
          <span className="content-type-address--phone">{phone}</span>
        </>
      )}
      {tty && (
        <>
          <br />
          <strong>TTY: </strong>{' '}
          <span className="content-type-address--tty">{tty}</span>
        </>
      )}
      {fax && (
        <>
          <br />
          <strong>Fax: </strong>{' '}
          <span className="content-type-address--fax">{fax}</span>
        </>
      )}
    </Address>
  )
}

export default BlockAddress
