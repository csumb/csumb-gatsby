import React from 'react'
import bp from 'style/breakpoints'
import styled from '@emotion/styled'

const containerStyle = {
  normal: bp({
    marginLeft: ['1rem', '1rem', 'auto'],
    marginRight: ['1rem', '1rem', 'auto'],
    maxWidth: '66ch',
  }),
  column: bp({
    marginLeft: ['1rem', '1rem', 'auto'],
    marginRight: ['1rem', '1rem', 'auto'],
    width: ['100%'],
  }),
  full: bp({
    marginLeft: ['1rem', '1rem', 'auto'],
    marginRight: ['1rem', '1rem', 'auto'],
    maxWidth: '1100px',
  }),
  inCollapsedHeader: bp({
    marginLeft: ['1rem', '1rem', 'auto'],
    marginRight: ['1rem', '1rem', 'auto'],
    maxWidth: '1100px',
    paddingLeft: '1.5rem',
  }),
  slightlyLarger: bp({
    marginLeft: ['1rem', '1rem', 'auto'],
    marginRight: ['1rem', '1rem', 'auto'],
    maxWidth: '80ch',
  }),
}

const ContainerContext = React.createContext(containerStyle)

const ContainerElement = styled('div')`
  ${props => props.container};
  ${props => props.isFull && `${containerStyle.full}`};
`

export { ContainerContext, ContainerElement, containerStyle }
