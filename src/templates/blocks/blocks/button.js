import React from 'react'
import { ButtonLinkAnchor } from '../../../components/common/button'
import styled from '@emotion/styled'

const Button = styled(ButtonLinkAnchor)`
  margin-bottom: 1rem;
  margin-right: 1rem;
`

const BlockButton = ({ url, text }) => (
  <Button
    href={url.replace('/edit.csumb.edu/', '/csumb.edu/')}
    buttonType="default"
  >
    {text}
  </Button>
)

export default BlockButton
