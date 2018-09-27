import React from 'react'
import Logo from '../../../assets/images/csumb-logo-blue.svg'
import { css } from 'emotion'
import Link from 'gatsby-link'
import Container from '../../container'
import bp from '../../styles/breakpoints'
import { StaticQuery, graphql } from 'gatsby'
import Search from './search'

const imageClassName = css(bp({
  float: 'left',
  width: ['200px', '350px', '400px', '400px'],
}))

class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: false
    }
  }

  componentDidMount() {
    window.fetch('https://csumb.okta.com/api/v1/users/me', {credentials: 'include'}).then(response => {
      return response.json()
    }).then(user => {
      this.setState({
        user: user
      })
    }).catch(error => {
      this.setState({
        user: false
      })
    })
  }
  
  render() {

    const User = (props) => {
      if(props.user) {
        return (
          <span>
            {props.user.profile.firstName}
          </span>
        )
      }
      return (
        <StaticQuery
          query={graphql`{
              site {
                siteMetadata {
                  okta {
                    login
                  }
                }
              }
            }`}
            render={data => (
                  <>
                  <a href={data.site.siteMetadata.okta.login}>Log in</a>
                  
                  </>
                  )}
        />
      )
    }

    return (
      <header>
        <Container>
          <Link to="/">
            <img src={Logo} alt={this.props.siteTitle} className={imageClassName}/>
          </Link>
          <User user={this.state.user}/>
          <Search/>
        </Container>
        {this.props.siteTitle}
      </header>
    )
  }
}

export default Header
