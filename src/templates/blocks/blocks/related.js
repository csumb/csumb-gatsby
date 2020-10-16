import React from 'react'
import styled from '@emotion/styled'
import { colors, bp } from '../../../style'
import LinkInspect from '../../../components/utilities/link-inspect'
import VisuallyHidden from '../../../components/utilities/visually-hidden'

const relatedBreakpoints = bp({
  margin: ['0.5rem 0', '0.5rem 0 0.5rem 0.5rem'],
  width: ['auto', '30%'],
  float: ['none', 'right', 'right'],
})

const RelatedContent = styled('div')`
  ${relatedBreakpoints};
  border-top: 1px solid ${colors.muted.bright};
  border-bottom: 1px solid ${colors.muted.bright};
  padding: 0.25rem;
`

const RelatedContentSource = styled('p')`
  margin-bottom: 0;
  font-weight: 700;
`

const RelatedContentTitle = styled('h5')`
  margin: 0.25rem 0;
`

const RelatedContentDescription = styled('p')``

const BlockRelated = ({ source, title, description, url }) => (
  <RelatedContent className="related-content">
    <VisuallyHidden>Related content</VisuallyHidden>
    <RelatedContentSource>{source}</RelatedContentSource>
    <RelatedContentTitle>
      <LinkInspect to={url}>{title}</LinkInspect>
    </RelatedContentTitle>
    <RelatedContentDescription>{description}</RelatedContentDescription>
  </RelatedContent>
)

export default BlockRelated
