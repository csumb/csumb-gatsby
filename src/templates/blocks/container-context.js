import React from 'react'
import bp from 'components/styles/breakpoints'
import { css } from 'emotion'
import styled from 'react-emotion'

const containerStyle = {
  normal: css(
    bp({
      marginLeft: ['1rem', '1rem', 'auto'],
      marginRight: ['1rem', '1rem', 'auto'],
      maxWidth: '66ch',
    })
  ),
  column: css(
    bp({
      marginLeft: ['1rem', '1rem', 'auto'],
      marginRight: ['1rem', '1rem', 'auto'],
      width: ['100%'],
    })
  ),
  full: css(
    bp({
      marginLeft: ['1rem', '1rem', 'auto'],
      marginRight: ['1rem', '1rem', 'auto'],
      maxWidth: '1100px',
    })
  ),
  slightlyLarger: css(
    bp({
      marginLeft: ['1rem', '1rem', 'auto'],
      marginRight: ['1rem', '1rem', 'auto'],
      maxWidth: '80ch',
    })
  ),
}

const ContainerContext = React.createContext(containerStyle)

const ContainerElement = styled('div')`
  ${props => props.container};
  ${props => props.isFull && `${containerStyle.full}`};
`

export { ContainerContext, ContainerElement, containerStyle }
