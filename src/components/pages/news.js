import React from 'react'
import Byline from 'components/byline'
import moment from 'moment'
import NewsContainer from 'components/news-container'
import styled from '@emotion/styled'
import Link from 'gatsby-link'
import VisuallyHidden from 'components/visually-hidden'
import { colors } from 'components/styles/theme'

const NewsTag = styled(Link)`
  color: ${colors.white};
  background: ${colors.primary.darkest};
  padding: 0.3rem;
`

const NewsTags = ({ tags }) => {
  if (!tags) {
    return null
  }
  return (
    <p>
      <VisuallyHidden>Tagged with:</VisuallyHidden>
      {tags.map(tag => (
        <NewsTag to={`news/tag/${tag.slug}`}>{tag.name}</NewsTag>
      ))}
    </p>
  )
}

const NewsByline = ({ story }) => {
  if (!story.bylineDate) {
    return null
  }
  const date = moment(story.bylineDate)

  return (
    <Byline>
      {story.bylineLocation} {date.format('MMMM D, YYYY')}
      {story.bylineName && <> {story.bylineName}</>}
    </Byline>
  )
}

const NewsContent = ({ content }) => (
  <NewsContainer dangerouslySetInnerHTML={{ __html: content }} />
)

export { NewsByline, NewsContent, NewsTags }
