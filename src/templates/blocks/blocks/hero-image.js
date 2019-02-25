import React from 'react'
import styled from '@emotion/styled'
import { colors } from 'style/theme'
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
  ${props =>
    props.position === 'right' &&
    `
    right: 0;
  `}
`

const MobileHeroTextWrapper = styled('div')`
  color: ${colors.white};
  background: ${colors.primary.dark};
  padding: 1rem;
`

const HeroText = ({ headline, text, buttonUrl, buttonText }) => (
  <>
    <h3>{headline}</h3>
    <p>{text}</p>
    {buttonUrl && buttonText && (
      <HeroButton to={buttonUrl}>{buttonText}</HeroButton>
    )}
  </>
)

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
    const { image, position } = this.props
    const { isMobile } = this.state
    return (
      <>
        {isMobile && (
          <MobileHeroTextWrapper>
            <HeroText {...this.props} />
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
            <HeroImageTextWrapper
              position={['ne', 'se'].indexOf(position) > -1 ? 'right' : 'left'}
            >
              <HeroText {...this.props} />
            </HeroImageTextWrapper>
          )}
        </LazyHero>
      </>
    )
  }
}

export default BlockHeroImage
