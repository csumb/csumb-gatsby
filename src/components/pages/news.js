import React from 'react'
import Byline from 'components/byline'
import moment from 'moment'
import NewsContainer from 'components/news-container'
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

export { NewsByline, NewsContent }
