import React from 'react'
import { Box } from '@rebass/grid/emotion'
import bp from './styles/breakpoints'
import styled from 'react-emotion'

const padding = ['1rem', '1rem', 'auto']

const ContainerElement = styled(Box)`
  ${props =>
    props.topPadding &&
    `
    padding-top: 1.5rem;
  `};
`

const Container = props => (
  <ContainerElement
    width={['auto', 'auto', '1100px']}
    pl={padding}
    pr={padding}
    {...props}
  />
)

export default Container
