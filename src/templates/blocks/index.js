import React from 'react'
import { Flex, Box } from '@rebass/grid/emotion'
import styled from '@emotion/styled'
import Container from 'components/container'
import BlockList from './blocks/list'
import BlockText from './blocks/text'
import BlockHeading from './blocks/heading'
import BlockButton from './blocks/button'
import BlockDocument from './blocks/document'
import BlockImage from './blocks/image'
import BlockCalendar from './blocks/calendar'
import BlockQuote from './blocks/quote'
import BlockAddress from './blocks/address'
import BlockDefinitionList from './blocks/definition-list'
import BlockVideo from './blocks/video'
import BlockByline from './blocks/byline'
import BlockHeroImage from './blocks/hero-image'
import BlockSound from './blocks/sound'
import BlockFeed from './blocks/feed'
import BlockPathway from './blocks/pathway'
import BlockForm from './blocks/form'
import BlockImageGrid from './blocks/image-grid'
import BlockMap from './blocks/map'
import BlockRelated from './blocks/related'
import BlockTable from './blocks/table'
import BlockPerson from './blocks/person'
import BlockEvent from './blocks/event'
import BlockEventFeed from './blocks/event-feed'
import BlockSocial from './blocks/social'
import BlockHtml from './blocks/html'
import 'style/collapse.css'

class Block extends React.Component {
  blockComponents = {
    feed: BlockFeed,
    form: BlockForm,
    imagegrid: BlockImageGrid,
    map: BlockMap,
    related: BlockRelated,
    table: BlockTable,
    text: BlockText,
    list: BlockList,
    heading: BlockHeading,
    calendar: BlockCalendar,
    heroimage: BlockHeroImage,
    byline: BlockByline,
    button: BlockButton,
    definitionlist: BlockDefinitionList,
    document: BlockDocument,
    image: BlockImage,
    quote: BlockQuote,
    address: BlockAddress,
    video: BlockVideo,
    sound: BlockSound,
    person: BlockPerson,
    event: BlockEvent,
    eventfeed: BlockEventFeed,
    pathway: BlockPathway,
    social: BlockSocial,
    html: BlockHtml,
  }

  render() {
    const { type, block, hidden, inColumn } = this.props
    if (typeof this.blockComponents[type] === 'undefined' || hidden) {
      return null
    }
    let BlockType = this.blockComponents[type]
    return <BlockType {...block.data} uuid={block.uuid} inColumn={inColumn} />
  }
}

const Columns = ({ layout, blocks, hidden }) => {
  const block = blocks[layout.id]
  if (typeof block.data.columns === 'undefined' || hidden) {
    return <></>
  }
  return (
    <Flex flexWrap="wrap">
      {block.data.columns.map((width, key) => (
        <Box
          width={[1, 1, width / 12, width / 12]}
          key={`column-${layout.id}-${key}`}
          px={2}
        >
          {Array.isArray(layout._children[key + 1]) && (
            <>
              {layout._children[key + 1].map(blockId => (
                <React.Fragment key={blockId.id}>
                  {blocks[blockId.id] && (
                    <Block
                      type={blocks[blockId.id].type}
                      block={blocks[blockId.id]}
                      inColumn
                    />
                  )}
                </React.Fragment>
              ))}
            </>
          )}
        </Box>
      ))}
    </Flex>
  )
}
class Blocks extends React.Component {
  blocksRef = React.createRef()

  constructor(props) {
    super(props)
    let { blocks } = props
    this.blocks = JSON.parse(blocks)
  }

  componentDidMount() {
    if (typeof document === 'undefined') {
      return
    }
    if (!this.blocksRef || !this.blocksRef.current) {
      return
    }
    const collapsibleHeaders = document.querySelectorAll(
      'h2[data-collapsible="true"],h3[data-collapsible="true"],h4[data-collapsible="true"]'
    )
    if (!collapsibleHeaders.length) {
      return
    }
    collapsibleHeaders.forEach(header => {
      const nextHeader = []
      const id = header.id
      for (let i = header.tagName.replace(/h/i, ''); i > 0; i--) {
        nextHeader.push(`h${i}[data-collapsible]`)
      }
      const selector = nextHeader.join(',')
      let element = header.nextElementSibling
      while (element) {
        if (element.matches(selector)) break
        element.setAttribute('data-collapse', id)
        element.classList.add('collapsible')
        element.classList.add('collapsed')
        element = element.nextElementSibling
      }
    })
  }

  render() {
    const blocks = this.blocks

    if (
      typeof blocks.layout === 'undefined' ||
      typeof blocks.layout.map === 'undefined'
    ) {
      return null
    }
    return (
      <Container ref={this.blocksRef}>
        {blocks.layout.map(layout => (
          <React.Fragment key={layout.id}>
            {blocks.blocks[layout.id] && (
              <>
                {layout._children ? (
                  <Columns layout={layout} blocks={blocks.blocks} />
                ) : (
                  <Block
                    key={layout.id}
                    type={blocks.blocks[layout.id].type}
                    block={blocks.blocks[layout.id]}
                  />
                )}
              </>
            )}
          </React.Fragment>
        ))}
      </Container>
    )
  }
}

export default Blocks
