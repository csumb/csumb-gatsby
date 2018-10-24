import React from 'react'
import { createPortal } from 'react-dom'

class Portal extends React.Component {
  state = {
    mounted: false,
  }

  componentDidMount() {
    this.node = document.createElement('div')
    document.body.appendChild(this.node)
    this.setState({ mounted: true })
  }

  componentWillUnmount() {
    document.body.removeChild(this.node)
  }

  render() {
    return this.state.mounted
      ? createPortal(this.props.children, this.node)
      : null
  }
}

export default Portal
