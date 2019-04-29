import React from 'react'
import Byline from 'components/pages/news/byline'
import moment from 'moment'
import NewsContainer from 'components/pages/news/news-container'
import styled from '@emotion/styled'
import Link from 'gatsby-link'
import { Flex, Box } from '@rebass/grid/emotion'
import { colors } from 'style/theme'

const NewsTag = styled(Link)`
  color: ${colors.white};
  background: ${colors.primary.dark};
  padding: 0.3rem;
  text-decoration: none;
  display: inline-block;
  margin-right: 1rem;
  margin-bottom: 1rem;
  &:hover {
    background: ${colors.primary.darkest};
  }
  &:visited {
    color: ${colors.white};
  }
`

const NewsTagWrapper = styled('div')`
  border-top: 1px solid ${colors.primary.darkest};
  padding-top: 0.5rem;
  margin-top: 0.5rem;
`

const NewsTags = ({ tags }) => {
  if (!tags) {
    return null
  }
  return (
    <NewsTagWrapper>
      <Flex flexWrap="wrap">
        <Box width={[1, 2 / 12, 2 / 12]} pr={[0, 2, 2]}>
          <h5>More about</h5>
        </Box>
        <Box width={[1, 10 / 12, 10 / 12]}>
          {tags.map(tag => (
            <NewsTag to={`news/tag/${tag.slug}`}>{tag.name}</NewsTag>
          ))}
        </Box>
      </Flex>
    </NewsTagWrapper>
  )
}

const NewsByline = ({ story }) => {
  if (!story.bylineDate) {
    return null
  }
  const date = moment(story.bylineDate)

  return (
    <Byline>
      {story.bylineName && <div> {story.bylineName}</div>}
      {story.bylineLocation} {date.format('MMMM D, YYYY')}
    </Byline>
  )
}

const NewsContent = ({ content }) => (
  <NewsContainer dangerouslySetInnerHTML={{ __html: content }} />
)

export { NewsByline, NewsContent, NewsTags }
