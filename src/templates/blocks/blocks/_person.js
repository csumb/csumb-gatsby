import React from 'react'
import { ContainerContext } from '../container-context'
import styled from 'react-emotion'

const Person = styled('div')`
  ${props => props.container};
`

class BlockPerson extends React.Component {
  render() {
    const { email, compact } = this.props

    return (
      <ContainerContext.Consumer>
        {container => <Person container={container}>{email}</Person>}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockPerson
