import React from 'react'
import bp from 'components/styles/breakpoints'
import { css } from 'emotion'
import styled from 'react-emotion'

const containerStyle = {
  wide: css(
    bp({
      marginLeft: ['1rem', 'auto'],
      marginRight: ['1rem', 'auto'],
      width: ['auto', 'auto', 'auto', 1100],
    })
  ),
  narrow: css(
    bp({
      marginLeft: ['1rem', 'auto'],
      marginRight: ['1rem', 'auto'],
      width: ['auto', 'auto', 'auto', 800],
    })
  ),
}

const ContainerContext = React.createContext(containerStyle)

const ContainerElement = styled('div')`
  ${props => props.container};
`

export { ContainerContext, ContainerElement, containerStyle }
