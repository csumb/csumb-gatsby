import React from 'react'
import { ButtonLink } from 'components/common/button'
import styled from '@emotion/styled'

const Button = styled(ButtonLink)`
  margin-bottom: 1rem;
  margin-right: 1rem;
`

class BlockButton extends React.Component {
  render() {
    const { url, text } = this.props
    return (
      <Button to={url} buttonType="default">
        {text}
      </Button>
    )
  }
}

export default BlockButton
