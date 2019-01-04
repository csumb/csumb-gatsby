import React from 'react'
import styled from 'react-emotion'
import LinkInspect from 'components/link-inspect'

const PageNavigationList = styled('ul')`
  list-style-type: none;
  margin: 0;
  li {
    margin: 0;
  }
  a {

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