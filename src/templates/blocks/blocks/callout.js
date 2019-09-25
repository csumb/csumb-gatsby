import React from 'react'
import styled from '@emotion/styled'
import { colors } from '../../../style'
import VisuallyHidden from '../../../components/utilities/visually-hidden'
import Link from 'gatsby-link'

const Callout = styled.div`
  background: ${colors.primary.darkest};
  color: ${colors.white};
  padding: 0.5rem;
`

const CalloutHeader = styled.h3`
  color: ${colors.white};
`

const BlockCallout = ({ title, text, url }) => (
  <Callout>
    <CalloutHeader>{title}</CalloutHeader>
    <p>{text}</p>
    {url && (
      <Link to={url}>
        Read more <VisuallyHidden>about this message</VisuallyHidden>
      </Link>
    )}
  </Callout>
)

export default BlockCallout
