import React from 'react'
import styled from 'react-emotion'
import { ContainerContext, ContainerElement } from '../container-context'
import { colors } from 'components/styles/theme'
import Link from 'gatsby-link'

const HeroImage = styled('div')`
  width: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #eceade;
  position: relative;
  height: 70vh;
`

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
      <HeroImage
        style={{
          backgroundImage: `url('${image.url}')`,
        }}
      >
        <ContainerContext.Consumer>
          {container => (
            <ContainerElement container={container}>
              <HeroImageTextWrapper>
                <HeroImageText>
                  {buttonUrl ? (
                    <Link to={buttonUrl}>{headline}</Link>
                  ) : (
                    <>{headline}</>
                  )}
                </HeroImageText>
              </HeroImageTextWrapper>
            </ContainerElement>
          )}
        </ContainerContext.Consumer>
      </HeroImage>
    )
  }
}

export default BlockHeroImage
