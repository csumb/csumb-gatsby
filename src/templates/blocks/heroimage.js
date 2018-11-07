import React from 'react'
import styled from 'react-emotion'
import { ContainerContext } from './container-context'
import theme from 'components/styles/theme'
import Link from 'gatsby-link'
import { css } from 'emotion'

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
  margin-top: 20px;
  position: relative;
`

const HeroImageText = styled('p')`
  font-size: 2rem;
  line-height: 2.8rem;
  font-weight: bold;
  color: ${theme.colors.primary.darkest};
  display: inline;
  white-space: pre-wrap;
  border: 0.25em solid ${theme.colors.white};
  background: ${theme.colors.white};
  &:after {
    background-color: ${theme.colors.white};
  }
  a {
    color: ${theme.colors.primary.darkest};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

class BlockHeroImage extends React.Component {
  render() {
    return (
      <HeroImage
        style={{
          backgroundImage: `url('${this.props.block.data.image.url}')`,
        }}
      >
        <ContainerContext.Consumer>
          {container => (
            <div className={container}>
              <HeroImageTextWrapper>
                <HeroImageText>
                  {this.props.block.data.buttonUrl ? (
                    <Link to={this.props.block.data.buttonUrl}>
                      {this.props.block.data.headline}
                    </Link>
                  ) : (
                    <>{this.props.block.data.headline}</>
                  )}
                </HeroImageText>
              </HeroImageTextWrapper>
            </div>
          )}
        </ContainerContext.Consumer>
      </HeroImage>
    )
  }
}

export default BlockHeroImage
