import React from 'react'
import styled from '@emotion/styled'
import { colors } from 'components/styles/theme'
import color from 'color'
import LazyHero from 'react-lazy-hero'
import LinkInspect from 'components/link-inspect'

const background = color(colors.primary.dark)
  .rgb()
  .array()

const HeroButton = styled(LinkInspect)`
  color: ${colors.white};
  border: 3px solid ${colors.white};
  display: inline-block;
  padding: 0.5rem;
  font-weight: bold;
  text-decoration: none;
`

const HeroImageTextWrapper = styled('div')`
  color: ${colors.white};
  background: rgba(${background[0]}, ${background[1]}, ${background[2]}, 0.8);
  position: absolute;
  width: 33.33333333%;
  min-height: 75vh;
  padding: 2rem;
`

const MobileHeroTextWrapper = styled('div')`
  color: ${colors.white};
  background: ${colors.primary.dark};
  padding: 1rem;
`

class BlockHeroImage extends React.Component {
  state = {
    isMobile: false,
  }
  componentDidMount() {
    const mobileBreakpoint = 830
    const that = this

    const setWindowSize = () => {
      that.setState({
        isMobile: window.innerWidth <= mobileBreakpoint,
      })
    }

    window.addEventListener('resize', setWindowSize)

    setWindowSize()
  }

  render() {
    const { image, buttonUrl, headline, text, buttonText } = this.props
    const { isMobile } = this.state
    return (
      <>
        {isMobile && (
          <MobileHeroTextWrapper>
            <h3>{headline}</h3>
            <p>{text}</p>
            <HeroButton to="link">This is text</HeroButton>
          </MobileHeroTextWrapper>
        )}
        <LazyHero
          opacity={0}
          parallaxOffset={0}
          transitionDuration={0}
          isCentered={false}
          imageSrc={image.url}
          minHeight="75vh"
        >
          {!isMobile && (
            <HeroImageTextWrapper>
              <h3>{headline}</h3>
              <p>{text}</p>
              <HeroButton to="link">This is text</HeroButton>
            </HeroImageTextWrapper>
          )}
        </LazyHero>
      </>
    )
  }
}

export default BlockHeroImage
