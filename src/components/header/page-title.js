import React from 'react'
import styled from 'react-emotion'
import { colors } from 'components/styles/theme'

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

const PageTitle = ({ layout, children, sub }) => {
  if (layout === 'site') {
    return null
  }
  return (
    <PageTitleHeader>
      {children}
      {sub && <PageTitleSubHeader>{sub}</PageTitleSubHeader>}
    </PageTitleHeader>
  )
}

export default PageTitle
