import React from 'react'
import styled from '@emotion/styled'
import { colors } from 'components/styles/theme'
import LazyHero from 'react-lazy-hero'
import Link from 'gatsby-link'

const HeroImageTextWrapper = styled('div')`
  padding-top: 1.5rem;
  padding-left: 1.5rem;
  position: relative;
`

const HeroImageText = styled('p')`
  font-size: 2rem;
  line-height: 2.8rem;
  font-weight: bold;
  color: ${colors.primary.darkest};
  display: inline;
  white-space: pre-wrap;
  border: 0.25em solid ${colors.white};
  background: ${colors.white};
  &:after {
    background-color: ${colors.white};
  }
  a {
    color: ${colors.primary.darkest};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

class BlockHeroImage extends React.Component {
  render() {
    const { image, buttonUrl, headline } = this.props
    return (
      <LazyHero
        opacity={0}
        parallaxOffset={0}
        transitionDuration={0}
        isCentered={false}
        imageSrc={image.url}
      >
        <HeroImageTextWrapper>
          <HeroImageText>
            {buttonUrl ? (
              <Link to={buttonUrl}>{headline}</Link>
            ) : (
              <>{headline}</>
            )}
          </HeroImageText>
        </HeroImageTextWrapper>
      </LazyHero>
    )
  }
}

export default BlockHeroImage
