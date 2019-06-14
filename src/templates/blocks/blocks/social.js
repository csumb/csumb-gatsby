import React, { Component } from 'react'
import styled from '@emotion/styled'
import { colors } from '../../../style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons'
import VisuallyHidden from '../../../components/utilities/visually-hidden'

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

class BlockSocial extends Component {
  render() {
    const { provider, url } = this.props
    return (
      <a href={url}>
        <SocialIcon icon={providers[provider]} />
        <VisuallyHidden>{provider}</VisuallyHidden>
      </a>
    )
  }
}

export default BlockSocial
