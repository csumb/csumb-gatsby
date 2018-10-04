import React from 'react'
import Logo from '../../../assets/images/csumb-logo-blue.svg'
import { css } from 'emotion'
import Link from 'gatsby-link'
import Container from '../../container'
import bp from '../../styles/breakpoints'
import Search from './search'
import { Flex, Box } from '@rebass/grid/emotion'

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
    const that = this
    const User = (props) => {
      if(props.user) {
        return (
          <span>
            {props.user.profile.firstName}
          </span>
        )
      }
      return (
        <>
        <a href={that.props.metadata.okta.login}>Log in</a>
        </>
      )
    }

    return (
      <header>
        <Container>
          <Flex flexWrap="wrap">
            <Box width={[ 1, 1, 1/2, 1/2 ]} px={2}>
              <Link to="/">
                <img src={Logo} alt={this.props.metadata.siteTitle} className={imageClassName}/>
              </Link>
            </Box>
            <Box width={[ 1, 1, 1/2, 1/2 ]} px={2}>
              <User user={this.state.user}/>
              <Search swiftypeId={this.props.metadata.swiftypeId}/>
            </Box>
          </Flex>
        </Container>
        {this.props.siteTitle}
      </header>
    )
  }
}

export default Header
