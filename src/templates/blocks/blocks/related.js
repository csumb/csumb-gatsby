import React from 'react'
import styled from '@emotion/styled'
import { colors } from 'components/styles/theme'
import LinkInspect from 'components/link-inspect'
import VisuallyHidden from 'components/visually-hidden'
import bp from 'components/styles/breakpoints'
import { css } from 'emotion'
import { ContainerElement, containerStyle } from '../container-context'

const relatedBreakpoints = css(
  bp({
    margin: ['0.5rem 0', '0.5rem 0 0.5rem 0.5rem'],
    width: ['auto', '30%'],
  })
)

const RelatedContent = styled('div')`
  ${relatedBreakpoints};
  float: right;
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

class BlockRelated extends React.Component {
  render() {
    const { source, title, description, url } = this.props
    return (
      <ContainerElement container={containerStyle.slightlyLarger}>
        <RelatedContent>
          <VisuallyHidden>Related content</VisuallyHidden>
          <RelatedContentSource>{source}</RelatedContentSource>
          <RelatedContentTitle>
            <LinkInspect to={url}>{title}</LinkInspect>
          </RelatedContentTitle>
          <RelatedContentDescription>{description}</RelatedContentDescription>
        </RelatedContent>
      </ContainerElement>
    )
  }
}

export default BlockRelated
