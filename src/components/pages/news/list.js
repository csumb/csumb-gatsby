import React from 'react'
import styled from '@emotion/styled'
import Link from 'gatsby-link'
import moment from 'moment'
import { Flex, Box } from '../../common/grid'
import { colors } from '../../../style'

const NewsList = styled.section``

const NewsListTag = styled(Link)`
  color: ${colors.white};
  background: ${colors.primary.dark};
  padding: 0.2rem 0.5rem;
  text-decoration: none;
  display: inline-block;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  &:hover {
    background: ${colors.primary.darkest};
  }
  &:visited {
    color: ${colors.white};
  }
`

const NewsListTags = ({ tags }) => (
  <div>
    {tags.map(tag => (
      <NewsListTag key={tag.slug} to={`news/tag/${tag.slug}`}>
        {tag.name}
      </NewsListTag>
    ))}
  </div>
)

const NewsListItem = ({
  showTags,
  slug,
  goLiveDate,
  teaserHeadline,
  teaserImage,
  childContentfulNewsStoryTeaserDescriptionTextNode,
  tags,
}) => {
  const publishDate = moment(goLiveDate)
  const pathDate = publishDate.format('YYYY/MMM/D').toLowerCase()
  const path = `news/${pathDate}/${slug}`
  if (!teaserHeadline) {
    return null
  }
  return (
    <Flex>
      <Box width={[1, 3 / 4, 3 / 4]} pr={[0, 4, 4]}>
        <h3>
          <Link to={path}>{teaserHeadline}</Link>
        </h3>
        {childContentfulNewsStoryTeaserDescriptionTextNode && (
          <p>
            {
              childContentfulNewsStoryTeaserDescriptionTextNode.teaserDescription
            }
          </p>
        )}
        {showTags && tags && <NewsListTags tags={tags} />}
      </Box>
      {teaserImage && teaserImage.file && (
        <Box width={[1, 1 / 4, 1 / 4]}>
          <img src={teaserImage.file.url} alt="" />
        </Box>
      )}
    </Flex>
  )
}

export { NewsList, NewsListItem }
