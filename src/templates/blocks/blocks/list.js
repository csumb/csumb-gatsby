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
    const { type, list } = this.props

    const ListTag =
      type == 'list-unstyled'
        ? styled('ul')`
            ${props => props.container};
            list-style-type: none;
            margin-left: 0;
          `
        : styled(type)`
            ${props => props.container};
          `
    return (
      <ContainerContext.Consumer>
        {container => (
          <ListTag container={container}>
            {list.map((item, key) => (
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
