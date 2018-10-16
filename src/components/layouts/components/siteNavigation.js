import React from 'react'
import LinkInspect from '../../link-inspect'
import Container from '../../container'
import { css } from 'emotion';


class SiteNavigation extends React.Component {
  

  render() {
    if(!this.props.navigation) {
      return null
    }

    const NavigationLink = (props) => {
      if(props.to) {
        return (
          <>
            <LinkInspect to={props.to}>{props.children}</LinkInspect>
          </>
        )
      }
      return (
        <span className={css`
          color: blue;
          font-weight: bold;
          `}>
            {props.children}
        </span>
      )
    }

    let navigation = JSON.parse(this.props.navigation)
    console.log(navigation)
    return (
      <div>
        <Container>
          <ul>
            {navigation.map((item, key) => (
              <li key={key}>
                <NavigationLink to={item.url}>
                  {item.name}
                </NavigationLink>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    )
  }
}

export default SiteNavigation
