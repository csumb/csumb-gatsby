import React from 'react'
import { css } from 'emotion'


class BlockDefinitionList extends React.Component {
  render() {
    return (
      <dl className={css`
        dt {
          font-weight: bold;
        }
      `}>
        {this.props.block.data.list.map(item => (
          <>
            <dt>{item.term}</dt>
            <dd>{item.definition}</dd>
          </>
        ))}
      </dl>
    )
  }
}

export default BlockDefinitionList