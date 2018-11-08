import React from 'react'
import { Flex, Box } from '@rebass/grid/emotion'

class BlockColumns extends React.Component {
  render() {
    const data = this.props.block.data
    return (
      <Flex flexWrap="wrap">
        {data.columns.map(column => (
          <Box width={[1, 1, column / 12, column / 12]} px={2}>
            COLUMN!
          </Box>
        ))}
      </Flex>
    )
  }
}

export default BlockColumns
