import React from 'react'
import styled from '@emotion/styled'
import Link from 'gatsby-link'
import moment from 'moment'
import { Flex, Box } from '@rebass/grid/emotion'

const NewsList = styled('section')``

const NewsListItem = ({
  title,
  slug,
  goLiveDate,
  teaserHeadline,
  teaserImage,
  childContentfulNewsStoryTeaserDescriptionTextNode,
}) => {
  const publishDate = moment(goLiveDate)
  const pathDate = publishDate.format('YYYY/MMM/D').toLowerCase()
  const path = `news/${pathDate}/${slug}`
  return (
    <Flex flexWrap="wrap">
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
