import React from 'react'
import { css } from 'emotion'
import bp from './styles/breakpoints'
import styled from 'react-emotion'

const containerClass = css(
  bp({
    margin: [0, 'auto'],
    width: ['auto', 'auto', 'auto', 1100],
  })
)

const ContainerElement = styled('div')`
  ${containerClass};
  ${props =>
    props.topPadding &&
    `
    padding-top: 1.5rem;
  `};
`

const Container = props => <ContainerElement {...props} />

export default Container
