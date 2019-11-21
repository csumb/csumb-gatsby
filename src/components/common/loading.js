import React from 'react'
import { colors } from '../../style'
import styled from '@emotion/styled'
import ReactLoading from 'react-loading'
import VisuallyHidden from '../utilities/visually-hidden'

const LoadingWrapper = styled('div')`
  text-align: center;
  margin: 2rem; 0;
  span {
    display: inline-block;
    padding-bottom: 0.3rem;
  }
  div {
    display: inline-block;
    margin-left: 1rem;
  }
`

const Loading = ({ children }) => {
  if (!children) {
    children = <VisuallyHidden>Loading</VisuallyHidden>
  }
  return (
    <LoadingWrapper>
      <span>{children}</span>
      <ReactLoading
        type="spin"
        color={colors.primary.darkest}
        height={30}
        width={30}
      />
    </LoadingWrapper>
  )
}

export default Loading
