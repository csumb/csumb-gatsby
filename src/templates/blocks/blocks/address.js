import React from 'react'
import styled from 'react-emotion'
import { ContainerContext } from './container-context'

const Address = styled('div')`
  font-style: italic;
  ${props => props.container};
`
class BlockAddress extends React.Component {
  render() {
    const data = this.props.block.data
    return (
      <ContainerContext.Consumer>
        {container => (
          <Address container={container}>
            <address>
              {data.address1 ? (
                <>
                  {data.address1}
                  <br />
                </>
              ) : null}
              {data.address2 ? (
                <>
                  {data.address2}
                  <br />
                </>
              ) : null}
              {data.address3 ? (
                <>
                  {data.address3}
                  <br />
                </>
              ) : null}
              {data.city}, {data.state} &nbsp;
              {data.zip}
            </address>
          </Address>
        )}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockAddress
