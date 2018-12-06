import React from 'react'

class RedirectPage extends React.Component {
  componentDidMount() {
    window.location.href = this.props.pageContext.redirect.url
  }

  render() {
    const { redirect } = this.props.pageContext
    return <p>Redirecting you to {redirect.name}.</p>
  }
}

export default RedirectPage
