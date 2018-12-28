import React from 'react'
import { Box } from '@rebass/grid/emotion'
import styled from 'react-emotion'

const ContainerElement = styled(Box)`
  ${props =>
    props.topPadding &&
    `
    padding-top: 1.5rem;
  `};
  max-width: 1100px;
`

ContainerElement.defaultProps = {
  mx: ['1rem', '1rem', 'auto'],
}

const Container = props => <ContainerElement {...props} />

export default Container
