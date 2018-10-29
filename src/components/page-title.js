import React from 'react'
import styled from 'react-emotion'
import theme from './styles/theme'

const PageTitleHeader = styled('h1')`
  border-bottom: 1px solid ${theme.colors.primary.dark};
  color: ${theme.colors.primary.dark};
  margin-top: 1rem;
`

const PageTitle = props => {
  if (props.layout === 'site') {
    return null
  }
  return <PageTitleHeader>{props.children}</PageTitleHeader>
}

export default PageTitle
