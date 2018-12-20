import React from 'react'
import styled from 'react-emotion'

const HeroWrapperElement = styled('div')`
  width: 100%;
  height: 80vh;
`

class HeroWrapper extends React.Component {

  state = {
    height: 500
  }

  componentDidMount() {
    let that = this
    that.setState({
      height: window.innerHeight - 500,
    })
    window.addEventListener('resize', () => {
      that.setState({
        height: window.innerHeight - 500,
      })
    })
  }

  render() {
    const { children } = this.props
    const { height } = this.state
    return (
      <HeroWrapperElement style={{ height: height }}>
        {children}
      </HeroWrapperElement>
    )
  }
}

export { HeroWrapper }