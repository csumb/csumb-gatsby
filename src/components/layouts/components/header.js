import React from 'react'
import Link from 'gatsby-link'
import { css } from 'emotion'
import Brand from './brand'
import Container from '../../container'
import Search from './search'
import Button from '../../button'
import NavigationLink from './navigation-link'
import { Flex, Box } from '@rebass/grid/emotion'


class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: false,
      showSearch: false
    }
    this.handleShowSearch = this.handleShowSearch.bind(this)
  }

  handleShowSearch(event) {
    event.preventDefault()
    this.setState({
      showSearch: !this.state.showSearch
    })
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
          <>
            <Link to="/dashboard" className={css`
              color: #000;
            `}>Dashboard</Link>
          </>
        )
      }
      return (
        <>
        <a href={that.props.metadata.okta.login} className={css`
          color: #000;
        `}>Log in</a>
        </>
      )
    }

    return (
      <>
        <header className={css`
        border-bottom: 2px solid black;
        padding: 1rem 0;    
        `}>
          <Container>
            <Flex flexWrap="wrap">
              <Box width={[ 1, 1, 1/4, 1/4 ]} px={2}>
                <Brand/>
              </Box>
              <Box width={[ 1, 1, 3/4, 3/4 ]} px={2}>
                <Flex flexWrap="wrap">
                  <Box width={[1, 1, 4/5, 4/5]} px={2} className={css`text-align: right;`}>
                    <div>
                      <User user={this.state.user}/>
                      <a href="#search" onClick={this.handleShowSearch} className={css`
                        color: #000;
                        margin-left: 1rem;
                      `}>Search</a>
                    </div>
                    <div className={css` 
                      margin-top: 1rem;
                    `}>
                      <ul className={css`
                        margin: 0;
                        list-style: none;
                      `}>
                        <NavigationLink to="/academics">Academics</NavigationLink>
                        <NavigationLink to="/cost">Cost &amp; Aid</NavigationLink>
                        <NavigationLink to="/about">About</NavigationLink>
                      </ul>
                    </div>
                  </Box>
                  <Box width={[1, 1, 1/5, 1/5]} px={2}>
                    <Button to="/apply" type="navigation" addStyle={css`
                      border-color: red;
                      color: red;
                      float: right;
                      &:hover {
                        background: red;
                        color: #fff;
                      }
                  `}>Apply</Button>
                  </Box>
                </Flex>
                
              </Box>
            </Flex>
          </Container>
        </header>
        <Search show={this.state.showSearch} swiftypeId={this.props.metadata.swiftypeId}/>
      </>
    )
  }
}

export { Header }