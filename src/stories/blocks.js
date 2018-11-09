import React from 'react'
import { storiesOf } from '@storybook/react'
import BlockAddress from 'templates/blocks/blocks/address'
import BlockButton from 'templates/blocks/blocks/button'
import BlockByline from 'templates/blocks/blocks/byline'
import BlockCalendar from 'templates/blocks/blocks/calendar'
import BlockCallout from 'templates/blocks/blocks/callout'
import BlockDefinitionList from 'templates/blocks/blocks/definition-list'
import BlockDocument from 'templates/blocks/blocks/document'
import BlockHeading from 'templates/blocks/blocks/heading'
import BlockHeroImage from 'templates/blocks/blocks/hero-image'
import BlockImage from 'templates/blocks/blocks/image'
import BlockList from 'templates/blocks/blocks/list'
import BlockText from 'templates/blocks/blocks/text'
import BlockQuote from 'templates/blocks/blocks/quote'
import BlockVideo from 'templates/blocks/blocks/video'
import typography from 'utils/typography'
import {
  ContainerContext,
  containerStyle,
} from 'templates/blocks/blocks/container-context'
import { sampleText, shortSampleText } from './sample-text'

typography.injectStyles()

storiesOf('Blocks', module)

storiesOf('Blocks/Address').add(
  'Address',
  () => (
    <ContainerContext.Provider value={containerStyle.wide}>
      <BlockAddress
        block={{
          data: {
            address1: '100 Campus Center',
            address2: 'Building 43',
            city: 'Seaside',
            state: 'CA',
            zip: '93955',
          },
        }}
      />
    </ContainerContext.Provider>
  ),
  {
    info:
      'Uses a native `<address>` element to render a mailing address. Can also be configured with phone, fax, email for a general contact form',
  }
)
storiesOf('Blocks/Button', module).add(
  'Button',
  () => (
    <ContainerContext.Provider value={containerStyle.wide}>
      <BlockButton
        block={{
          data: {
            text: 'This is a button',
            url: '#url',
          },
        }}
      />
    </ContainerContext.Provider>
  ),
  {
    info: 'Renders a button using the `ButtonLink` component.',
  }
)
storiesOf('Blocks/Byline', module).add(
  'Byline',
  () => (
    <ContainerContext.Provider value={containerStyle.wide}>
      <BlockByline
        block={{
          data: {
            dateFormat: 'November 1, 2018',
          },
        }}
      />
    </ContainerContext.Provider>
  ),
  {
    info: 'Used for tagging news articles with a consistent byline.',
  }
)

storiesOf('Blocks/Calendar', module).add(
  'Calendar',
  () => (
    <ContainerContext.Provider value={containerStyle.wide}>
      <BlockCalendar
        block={{
          data: {
            format: 'week',
            calendar:
              'csumb.edu_l26qls3tik5cgfq262kc5tu6fs@group.calendar.google.com',
          },
        }}
      />
    </ContainerContext.Provider>
  ),
  {
    info: 'Embeds a google calendar in month, week, or agenda format.',
  }
)

storiesOf('Blocks/Callout', module).add('Callout', () => (
  <ContainerContext.Provider value={containerStyle.wide}>
    <BlockCallout
      block={{
        data: {
          title: shortSampleText,
          text: sampleText,
          url: '#here',
        },
      }}
    />
  </ContainerContext.Provider>
))

storiesOf('Blocks/Definition List', module).add('Definition List', () => (
  <ContainerContext.Provider value={containerStyle.wide}>
    <BlockDefinitionList
      block={{
        data: {
          list: [
            {
              term: 'The whale',
              definition: 'A fearsome best, the leviathan.',
            },
            {
              term: 'The Pequod',
              definition: 'A leaky boat cast asunder amongst the waves.',
            },
            {
              term: 'Ahab',
              definition: 'No sadder soul, with a heart of crumpled iron.',
            },
          ],
        },
      }}
    />
  </ContainerContext.Provider>
))

storiesOf('Blocks/Document', module).add('Document', () => (
  <ContainerContext.Provider value={containerStyle.wide}>
    <BlockDocument
      block={{
        data: {
          name: 'List of souls aboard the Pequod',
          document: {
            url: '#document',
          },
        },
      }}
    />
  </ContainerContext.Provider>
))
storiesOf('Blocks/Headings', module)
  .add('Main', () => (
    <ContainerContext.Provider value={containerStyle.wide}>
      <BlockHeading
        block={{
          data: {
            level: 2,
            text: shortSampleText,
          },
        }}
      />
      <BlockHeading
        block={{
          data: {
            level: 2,
            text: shortSampleText,
            url: '#link',
          },
        }}
      />
    </ContainerContext.Provider>
  ))
  .add('Sub', () => (
    <ContainerContext.Provider value={containerStyle.wide}>
      <BlockHeading
        block={{
          data: {
            level: 3,
            text: shortSampleText,
          },
        }}
      />
      <BlockHeading
        block={{
          data: {
            level: 3,
            text: shortSampleText,
            url: '#link',
          },
        }}
      />
    </ContainerContext.Provider>
  ))
  .add('Sub sub', () => (
    <ContainerContext.Provider value={containerStyle.wide}>
      <BlockHeading
        block={{
          data: {
            level: 4,
            text: shortSampleText,
          },
        }}
      />
      <BlockHeading
        block={{
          data: {
            level: 4,
            text: shortSampleText,
            url: '#link',
          },
        }}
      />
    </ContainerContext.Provider>
  ))

storiesOf('Blocks/Hero Image', module).add('Hero Image', () => (
  <ContainerContext.Provider value={containerStyle.wide}>
    <BlockHeroImage
      block={{
        data: {
          buttonUrl: '#here',
          image: {
            url: 'https://placekitten.com/g/2000/900',
          },
          headline: shortSampleText,
        },
      }}
    />
  </ContainerContext.Provider>
))

storiesOf('Blocks/Image', module)
  .add('Image', () => (
    <ContainerContext.Provider value={containerStyle.wide}>
      <BlockImage
        block={{
          data: {
            image: {
              url: 'https://placekitten.com/300/300',
            },
            description: shortSampleText,
          },
        }}
      />
    </ContainerContext.Provider>
  ))
  .add('Pull right', () => (
    <ContainerContext.Provider value={containerStyle.wide}>
      <BlockImage
        block={{
          data: {
            image: {
              url: 'https://placekitten.com/300/300',
            },
            pullRight: true,
            description: shortSampleText,
          },
        }}
      />
    </ContainerContext.Provider>
  ))

const listItems = [
  { text: 'But granting all this' },
  {
    text:
      'that in the <strong>broad boundless ocean</strong>, one <a href="#whale">solitary whale</a>.',
  },
  { text: 'For the peculiar snow-white brow of Moby Dick' },
  {
    text:
      'His broad fins are bored, and scalloped out like a lost sheep’s ear!',
  },
]

storiesOf('Blocks/List', module)
  .add('Unordered', () => (
    <ContainerContext.Provider value={containerStyle.wide}>
      <BlockList
        block={{
          data: {
            type: 'ul',
            list: listItems,
          },
        }}
      />
    </ContainerContext.Provider>
  ))
  .add('Ordered', () => (
    <ContainerContext.Provider value={containerStyle.wide}>
      <BlockList
        block={{
          data: {
            type: 'ol',
            list: listItems,
          },
        }}
      />
    </ContainerContext.Provider>
  ))
  .add('Unstyled', () => (
    <ContainerContext.Provider value={containerStyle.wide}>
      <BlockList
        block={{
          data: {
            type: 'list-unstyled',
            list: listItems,
          },
        }}
      />
    </ContainerContext.Provider>
  ))

storiesOf('Blocks/Text', module)
  .add('Regular', () => (
    <ContainerContext.Provider value={containerStyle.wide}>
      <BlockText block={{ data: { text: sampleText } }} />
    </ContainerContext.Provider>
  ))
  .add('Lead paragraph', () => (
    <ContainerContext.Provider value={containerStyle.wide}>
      <BlockText block={{ data: { lead: true, text: sampleText } }} />
    </ContainerContext.Provider>
  ))

storiesOf('Blocks/Quote', module)
  .add('Quote', () => (
    <ContainerContext.Provider value={containerStyle.wide}>
      <BlockQuote
        block={{
          data: {
            quote: sampleText,
          },
        }}
      />
    </ContainerContext.Provider>
  ))
  .add('With source', () => (
    <ContainerContext.Provider value={containerStyle.wide}>
      <BlockQuote
        block={{
          data: {
            quote: sampleText,
            source: 'Captain Ahab',
          },
        }}
      />
    </ContainerContext.Provider>
  ))
  .add('With source & url', () => (
    <ContainerContext.Provider value={containerStyle.wide}>
      <BlockQuote
        block={{
          data: {
            quote: sampleText,
            source: 'Captain Ahab',
            url: '#whale',
          },
        }}
      />
    </ContainerContext.Provider>
  ))

storiesOf('Blocks/Video', module).add('YouTube', () => (
  <ContainerContext.Provider value={containerStyle.wide}>
    <BlockVideo
      block={{
        data: {
          provider: {
            id: 'NMPW4R727QQ',
          },
        },
      }}
    />
  </ContainerContext.Provider>
))
