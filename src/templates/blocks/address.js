import React from 'react'
import { css } from 'emotion'


class BlockAddress extends React.Component {
  render() {
    const data = this.props.block.data
    return (
      <div className={css`
        font-style: italic;
      `}>
        <address>
          {data.address1 ? data.address1 : null}
          {data.address2 ? data.address2 : null}<br/>
          {data.address3 ? data.address3 : null}<br/>
          {data.city}, {data.state} &nbsp;{data.zip}
        </address>
      </div>
    )
  }
}

export default BlockAddress