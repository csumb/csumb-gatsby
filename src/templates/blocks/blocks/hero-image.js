import React from 'react'
import styled from '@emotion/styled'
import { colors } from 'style/theme'
import color from 'color'
import LazyHero from 'react-lazy-hero'
import LinkInspect from 'components/utilities/link-inspect'
import Container from 'components/common/container'
import BreakpointContext from 'components/contexts/breakpoint'
const heroHeight = '60vh'

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
  &:visited {
    color: ${colors.white};
  }
`

const HeroImageTextWrapper = styled('div')`
  color: ${colors.white};
  background: rgba(${background[0]}, ${background[1]}, ${background[2]}, 0.8);
  position: absolute;
  width: 33.33333333%;
  max-height: ${heroHeight};
  padding: 2rem;
  ${props =>
    props.position === 'right' &&
    `
    right: 0;`}
`

const MobileHeroTextWrapper = styled('div')`
  color: ${colors.white};
  background: ${colors.primary.dark};
  padding: 1rem;
`

const HeroContainer = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
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

const BlockHeroImage = ({
  image,
  position,
  headline,
  text,
  buttonUrl,
  buttonText,
}) => (
  <BreakpointContext.Consumer>
    {({ isMobile }) => (
      <>
        {isMobile && (headline || text) && (
          <MobileHeroTextWrapper>
            <HeroText
              text={text}
              headline={headline}
              buttonUrl={buttonUrl}
              buttonText={buttonText}
            />
          </MobileHeroTextWrapper>
        )}
        <LazyHero
          opacity={0}
          parallaxOffset={0}
          transitionDuration={0}
          isCentered={false}
          imageSrc={image.url}
          minHeight={heroHeight}
        >
          {!isMobile && (
            <HeroContainer>
              <Container>
                {(headline || text) && (
                  <HeroImageTextWrapper
                    position={
                      ['ne', 'se'].indexOf(position) > -1 ? 'right' : 'left'
                    }
                  >
                    <HeroText
                      text={text}
                      headline={headline}
                      buttonUrl={buttonUrl}
                      buttonText={buttonText}
                    />
                  </HeroImageTextWrapper>
                )}
              </Container>
            </HeroContainer>
          )}
        </LazyHero>
      </>
    )}
  </BreakpointContext.Consumer>
)

export default BlockHeroImage
