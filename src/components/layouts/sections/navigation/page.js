import React from 'react'
import styled from '@emotion/styled'
import LinkInspect from '../../../utilities/link-inspect'
import { colors } from '../../../../style'

const PageNavigationList = styled.ul`
  list-style-type: none;
  margin: 0;
  ${props =>
    props.isChild &&
    `
    margin-left: 1rem;
    margin-top: 1rem;
    `}
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
  <nav>
    <PageNavigationList>
      {navigation.map((item, key) => (
        <li key={item.url}>
          <LinkInspect to={item.url}>{item.name}</LinkInspect>
          {item.children && item.children.length > 0 && (
            <PageNavigationList isChild={true}>
              {item.children.map(child => (
                <li key={child.url}>
                  <LinkInspect to={child.url}>{child.name}</LinkInspect>
                </li>
              ))}
            </PageNavigationList>
          )}
        </li>
      ))}
    </PageNavigationList>
  </nav>
)

export default PageNavigation
