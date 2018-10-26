import React from 'react'
import Button from '../../components/button'

class BlockButton extends React.Component {
  render() {
    return (
      <Button href={this.props.block.data.url} buttonType="default">
        {this.props.block.data.text}
      </Button>
    )
  }
}

export default BlockButton
