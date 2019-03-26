import React from 'react'
import styled from '@emotion/styled'
import LinkInspect from 'components/link-inspect'
import { colors } from 'style/theme'

const PageNavigationList = styled('ul')`
  list-style-type: none;
  margin: 0;
  li {
    margin: 0;
    padding-bottom: 0.5rem;
  }
  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
    &[aria-current='page'] {
      text-decoration: underline;
      color: ${colors.primary.darkest};
    }
  }
`

const PageNavigation = ({ navigation }) => (
  <PageNavigationList>
    {navigation.map((item, key) => (
      <li key={key}>
        <LinkInspect to={item.url}>{item.name}</LinkInspect>
      </li>
    ))}
  </PageNavigationList>
)

export default PageNavigation
