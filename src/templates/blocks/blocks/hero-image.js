import React from 'react'
import styled from '@emotion/styled'
import { colors } from '../../../style'
import color from 'color'
import HeroImage from '../../../components/common/hero-image'
import LinkInspect from '../../../components/utilities/link-inspect'
import Container from '../../../components/common/container'
import BreakpointContext from '../../../components/contexts/breakpoint'
const heroHeight = '60vh'

const background = color(colors.gray.dark)
  .rgb()
  .array()

const HeroButton = styled(LinkInspect)`
  color: ${colors.white};
  background: ${colors.buttons.default};
  border-radius: 6px;
  padding: 0.45rem 1rem;
  font-weight: bold;
  text-decoration: none;
  text-align: center;
  align-self: center;
  &:visited {
    color: ${colors.white};
  }
  &:hover {
    background: ${colors.buttons.dark};
  }
`

const HeroImageTextWrapper = styled('div')`
  color: ${colors.white};
  background: rgba(${background[0]}, ${background[1]}, ${background[2]}, 0.5);
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 40%;
  max-height: ${heroHeight};
  padding: 2rem;
  ${props =>
    (props.position === 'right' &&
      `
    right: 0;
    margin-right: 40px;
    `) ||
    (props.position === 'left' &&
      `
    left: 0;
    margin-left: 40px;
    `)}
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
        <HeroImage
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
        </HeroImage>
      </>
    )}
  </BreakpointContext.Consumer>
)

export default BlockHeroImage
