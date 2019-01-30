import React from 'react'
import { Box } from '@rebass/grid'
import styled from '@emotion/styled'

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
