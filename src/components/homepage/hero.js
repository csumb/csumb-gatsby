import React, { Component } from 'react'
import styled from 'react-emotion'

const HeroWrapperElement = styled('div')`
  width: 100%;
  height: 80vh;
`

const StaticHero = styled('div')`
  height: 500px;
  margin-bottom: 1rem;
  position: relative;
`

const HeroPadding = styled('div')`
  padding: 2rem 0;
`

const headerHeight = 200

class FullHeroWrapper extends Component {
  state = {
    height: this.props.minHeight ? this.props.minHeight : 500,
  }

  componentDidMount() {
    let that = this
    const { minHeight } = this.props
    const getHeight = () => {
      const height =
        window.innerHeight - headerHeight > minHeight
          ? window.innerHeight - headerHeight
          : minHeight
      that.setState({
        height: height,
      })
    }
    getHeight()

    window.addEventListener('resize', () => {
      getHeight()
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

export { HeroPadding, StaticHero, FullHeroWrapper }
