import React from 'react'
import styled from 'react-emotion'
import { ContainerContext } from './container-context'

const Address = styled('div')`
  font-style: italic;
  ${props => props.container};
`
class BlockAddress extends React.Component {
  render() {
    const { address1, address2, address3, city, state, zip } = this.props
    return (
      <ContainerContext.Consumer>
        {container => (
          <Address container={container}>
            <address>
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
            </address>
          </Address>
        )}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockAddress
