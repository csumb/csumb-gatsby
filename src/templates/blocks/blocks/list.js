import React from 'react'
import styled from '@emotion/styled'
import parseHtml from '../parse-html'

class BlockList extends React.Component {
  render() {
    const { type, list } = this.props

    const ListTag =
      type === 'list-unstyled'
        ? styled('ul')`
            list-style-type: none;
            margin-left: 0;
          `
        : styled(type)``
    return (
      <ListTag>
        {list.map((item, key) => (
          <React.Fragment key={key}>
            {item.text && item.text.trim().length > 0 && (
              <li>{parseHtml(item.text)}</li>
            )}
          </React.Fragment>
        ))}
      </ListTag>
    )
  }
}

export default BlockList
