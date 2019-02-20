import React from 'react'
import styled from '@emotion/styled'
import Link from 'gatsby-link'
import moment from 'moment'

const NewsList = styled('section')``

const NewsListItem = ({ title, slug, goLiveDate }) => {
  const publishDate = moment(goLiveDate)
  const pathDate = publishDate.format('YYYY/MMM/D').toLowerCase()
  const path = `news/${pathDate}/${slug}`
  return <Link to={path}>{title}</Link>
}

export { NewsList, NewsListItem }
