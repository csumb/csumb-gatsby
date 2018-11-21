import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/layouts/components/site-header'
import Container from 'components/container'

class PrivatePage extends React.Component {
  state = {
    isLoggedIn: false,
  }

  componentDidMount() {
    this.setState({
      isLoggedIn: true,
    })
  }

  render() {
    return (
      <Layout>
        <SiteHeader path="/private">Private</SiteHeader>
        <Container>
          {this.state.isLoggedIn && <p>Some private content!</p>}
        </Container>
      </Layout>
    )
  }
}

export default PrivatePage
