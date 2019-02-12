import React from 'react'
import RichText from '@madebyconnor/rich-text-to-jsx'
import { BLOCKS } from '@contentful/rich-text-types'
import NewsContainer from 'components/news-container'

const Paragraph = ({ children }) => (
  <NewsContainer>
    <p>{children}</p>
  </NewsContainer>
)

const Heading = ({ children, level }) => {
  const HeadingTag = `h${level}`
  return (
    <NewsContainer>
      <HeadingTag>{children}</HeadingTag>
    </NewsContainer>
  )
}

const List = ({ children, tag }) => {
  const ListTag = tag
  return (
    <NewsContainer>
      <ListTag>{children}</ListTag>
    </NewsContainer>
  )
}

const ListItem = ({ children }) => <li>{children}</li>

const RichTextRenderer = ({ richText }) => {
  return (
    <RichText
      richText={richText}
      overrides={{
        [BLOCKS.PARAGRAPH]: {
          component: Paragraph,
        },
        [BLOCKS.HEADING_1]: {
          component: Heading,
          props: {
            level: 1,
          },
        },
        [BLOCKS.HEADING_2]: {
          component: Heading,
          props: {
            level: 2,
          },
        },
        [BLOCKS.HEADING_3]: {
          component: Heading,
          props: {
            level: 3,
          },
        },
        [BLOCKS.HEADING_4]: {
          component: Heading,
          props: {
            level: 4,
          },
        },
        [BLOCKS.HEADING_5]: {
          component: Heading,
          props: {
            level: 5,
          },
        },
        [BLOCKS.HEADING_6]: {
          component: Heading,
          props: {
            level: 6,
          },
        },
        [BLOCKS.UL_LIST]: {
          component: List,
          props: {
            tag: 'ul',
          },
        },
        [BLOCKS.OL_LIST]: {
          component: List,
          props: {
            tag: 'ol',
          },
        },
        [BLOCKS.LIST_ITEM]: {
          component: ListItem,
        },
      }}
    />
  )
}
export default RichTextRenderer
