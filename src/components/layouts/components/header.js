import React from 'react'
//import Link from 'gatsby-link'
import { css } from 'emotion'
import Brand from './brand'
import Container from '../../container'
import Search from './search'
import Button from '../../button'
import { Flex, Box } from '@rebass/grid/emotion'

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
      <header className={css`
          border-bottom: 2px solid black;
          padding: 1rem 0;    
        `}>
        <Container>
          <Flex flexWrap="wrap">
            <Box width={[ 1, 1, 1/4, 1/4 ]} px={2}>
              <Brand/>
            </Box>
            <Box width={[ 1, 1, 1/4, 1/4 ]} px={2}>
              <Button to="/apply" type="navigation">Apply</Button>
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
