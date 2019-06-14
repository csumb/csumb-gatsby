import React from 'react'
import RichText from '@madebyconnor/rich-text-to-jsx'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import Container from '../common/container'
import { ContentImageInline } from './blocks/image'

const Paragraph = ({ children }) => (
  <Container>
    <p>{children}</p>
  </Container>
)

const Heading = ({ children, level }) => {
  const HeadingTag = `h${level}`
  return (
    <Container>
      <HeadingTag>{children}</HeadingTag>
    </Container>
  )
}

const List = ({ children, tag }) => {
  const ListTag = tag
  return (
    <Container>
      <ListTag>{children}</ListTag>
    </Container>
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
        [INLINES.EMBEDDED_ENTRY]: {
          contentImage: {
            component: ContentImageInline,
          },
        },
      }}
    />
  )
}
export default RichTextRenderer
