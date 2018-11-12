import React from 'react'
import styled from 'react-emotion'
import { colors } from './styles/theme'

const PageTitleHeader = styled('h1')`
  border-bottom: 1px solid ${colors.primary.darkest};
  color: ${colors.primary.darkest};
  margin-top: 1rem;
`

const PageTitleSubHeader = styled('small')`
  font-size: 80%;
  margin-left: 1rem;
  color: ${colors.primary.dark};
`

const PageTitle = props => {
  if (props.layout === 'site') {
    return null
  }
  return (
    <PageTitleHeader>
      {props.children}
      {props.sub && <PageTitleSubHeader>{props.sub}</PageTitleSubHeader>}
    </PageTitleHeader>
  )
}

export default PageTitle
