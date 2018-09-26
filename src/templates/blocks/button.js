import React from 'react'
import Button from '@material-ui/core/Button'


class BlockButton extends React.Component {
  render() {
    return (
      <Button href={this.props.block.data.url}>
        {this.props.block.data.text}
      </Button>
    )
  }
}

export default BlockButton