import React from 'react'
import styled from '@emotion/styled'
import { colors } from 'style/theme'
import { ContainerContext, ContainerElement } from '../container-context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons'
import VisuallyHidden from 'components/visually-hidden'

const providers = {
  facebook: faFacebook,
  twitter: faTwitter,
  instagram: faInstagram,
  linkedin: faLinkedin,
}

const SocialIcon = styled(FontAwesomeIcon)`
  font-size: 3rem;
  color: ${colors.muted.darkest};
  margin-right: 1.5rem;
`

class BlockSocial extends React.Component {
  render() {
    const { provider, url } = this.props
    return (
      <ContainerContext.Consumer>
        {container => (
          <ContainerElement container={container}>
            <a href={url}>
              <SocialIcon icon={providers[provider]} />
              <VisuallyHidden>{provider}</VisuallyHidden>
            </a>
          </ContainerElement>
        )}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockSocial
