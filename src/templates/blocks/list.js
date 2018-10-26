import React from 'react'
import { ContainerContext } from './container-context'
import styled from 'react-emotion'

class BlockList extends React.Component {
  createMarkup(text) {
    return {
      __html: text,
    }
  }

  render() {
    const ListTag = styled(this.props.block.data.type)`
      ${props => props.container};
    `
    return (
      <ContainerContext.Consumer>
        {container => (
          <ListTag container={container}>
            {this.props.block.data.list.map((item, key) => (
              <li
                dangerouslySetInnerHTML={this.createMarkup(item.text)}
                key={key}
              />
            ))}
          </ListTag>
        )}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockList
