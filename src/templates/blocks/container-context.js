import React from 'react'
import bp from 'components/styles/breakpoints'
import { css } from 'emotion'
import styled from 'react-emotion'

const containerStyle = {
  normal: css(
    bp({
      marginLeft: ['1rem', 'auto'],
      marginRight: ['1rem', 'auto'],
      width: ['100%', '100%', '66ch', '66ch'],
    })
  ),
  column: css(
    bp({
      marginLeft: ['1rem', 'auto'],
      marginRight: ['1rem', 'auto'],
      width: ['100%'],
    })
  ),
  full: css(
    bp({
      marginLeft: ['1rem', 'auto'],
      marginRight: ['1rem', 'auto'],
      width: ['auto', 'auto', 'auto', 1100],
    })
  ),
  slightlyLarger: css(
    bp({
      marginLeft: ['1rem', 'auto'],
      marginRight: ['1rem', 'auto'],
      width: ['100%', '100%', '80ch', '80ch'],
    })
  ),
}

const ContainerContext = React.createContext(containerStyle)

const ContainerElement = styled('div')`
  ${props => props.container};
  ${props => props.isFull && `${containerStyle.full}`};
`

export { ContainerContext, ContainerElement, containerStyle }
