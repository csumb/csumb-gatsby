import React from 'react'
import LinkInspect from '../../link-inspect'
import Container from '../../container'
import styled from 'react-emotion'
import theme from '../../styles/theme'

const SiteNavigationToggle = styled('span')`
  color: ${theme.colors.primary.dark};
  font-weight: bold;
`

class SiteNavigation extends React.Component {
  render() {
    if (!this.props.navigation) {
      return null
    }

    const NavigationLink = props => {
      if (props.to) {
        return (
          <>
            <LinkInspect to={props.to}>{props.children}</LinkInspect>
          </>
        )
      }
      return <SiteNavigationToggle>{props.children}</SiteNavigationToggle>
    }

    const navigation = JSON.parse(this.props.navigation)

    return (
      <div>
        <Container>
          <ul>
            {navigation.map((item, key) => (
              <li key={key}>
                <NavigationLink to={item.url}>{item.name}</NavigationLink>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    )
  }
}

export default SiteNavigation
