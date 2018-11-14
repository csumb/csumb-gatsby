import React from 'react'
import { storiesOf } from '@storybook/react'
import BlockAddress from 'templates/blocks/blocks/address'
import BlockButton from 'templates/blocks/blocks/button'
import BlockByline from 'templates/blocks/blocks/byline'
import BlockCalendar from 'templates/blocks/blocks/calendar'
import BlockCallout from 'templates/blocks/blocks/callout'
import BlockDefinitionList from 'templates/blocks/blocks/definition-list'
import BlockDocument from 'templates/blocks/blocks/document'
import BlockFeed from 'templates/blocks/blocks/feed'
import BlockHeading from 'templates/blocks/blocks/heading'
import BlockHeroImage from 'templates/blocks/blocks/hero-image'
import BlockImage from 'templates/blocks/blocks/image'
import BlockImageGrid from 'templates/blocks/blocks/image-grid'
import BlockForm from 'templates/blocks/blocks/form'
import BlockList from 'templates/blocks/blocks/list'
import BlockText from 'templates/blocks/blocks/text'
import BlockQuote from 'templates/blocks/blocks/quote'
import BlockVideo from 'templates/blocks/blocks/video'
import BlockRelated from 'templates/blocks/blocks/related'
import BlockSound from 'templates/blocks/blocks/sound'
import BlockTable from 'templates/blocks/blocks/table'
import BlockPathway from 'templates/blocks/blocks/pathway'
import BlockMap from 'templates/blocks/blocks/map'
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
        {...{
          address1: '100 Campus Center',
          address2: 'Building 43',
          city: 'Seaside',
          state: 'CA',
          zip: '93955',
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
        {...{
          text: 'This is a button',
          url: '#url',
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
        {...{
          dateFormat: 'November 1, 2018',
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
        {...{
          format: 'week',
          calendar:
            'csumb.edu_l26qls3tik5cgfq262kc5tu6fs@group.calendar.google.com',
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
      {...{
        title: shortSampleText,
        text: sampleText,
        url: '#here',
      }}
    />
  </ContainerContext.Provider>
))

storiesOf('Blocks/Definition List', module).add('Definition List', () => (
  <ContainerContext.Provider value={containerStyle.wide}>
    <BlockDefinitionList
      {...{
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
      }}
    />
  </ContainerContext.Provider>
))

storiesOf('Blocks/Document', module).add('Document', () => (
  <ContainerContext.Provider value={containerStyle.wide}>
    <BlockDocument
      {...{
        name: 'List of souls aboard the Pequod',
        document: {
          url: '#document',
        },
      }}
    />
  </ContainerContext.Provider>
))

const sampleFeed = [
  {
    page_title: 'A page',
    page_link: '/this/page',
    created: '2018-10-02  9:10',
    image: false,
    title: 'The title of the thing',
    teaser:
      'Such, then, was the person that I saw seated on the transom when I followed Captain Peleg down into the cabin.',
  },
  {
    page_title: 'Another page',
    page_link: '/this/page',
    created: '2018-10-02  9:10',
    image: false,
    title: 'The title of the thing',
    teaser:
      'Such, then, was the person that I saw seated on the transom when I followed Captain Peleg down into the cabin.',
  },
]

storiesOf('Blocks/Feed', module)
  .add('Regular', () => (
    <ContainerContext.Provider value={containerStyle.wide}>
      <BlockFeed
        {...{
          limit: '5',
          title: '',
          showMore: false,
          displayShort: false,
          items: sampleFeed,
        }}
      />
    </ContainerContext.Provider>
  ))
  .add('Short display', () => (
    <ContainerContext.Provider value={containerStyle.wide}>
      <BlockFeed
        {...{
          limit: '5',
          title: '',
          showMore: false,
          displayShort: true,
          items: sampleFeed,
        }}
      />
    </ContainerContext.Provider>
  ))

storiesOf('Blocks/Form', module).add('Google Form', () => (
  <ContainerContext.Provider value={containerStyle.wide}>
    <BlockForm
      {...{
        provider: {
          provider: 'google',
          form: '1FAIpQLSfkPnvfSSiVFWRB6B6zNF3rfqKOTiUb6qNfJ9a8_DoOzT_45Q',
        },
      }}
    />
  </ContainerContext.Provider>
))

storiesOf('Blocks/Headings', module)
  .add('Main', () => (
    <ContainerContext.Provider value={containerStyle.wide}>
      <BlockHeading
        {...{
          level: 2,
          text: shortSampleText,
          uuid: Math.random(),
        }}
      />
      <BlockHeading
        {...{
          level: 2,
          text: shortSampleText,
          url: '#link',
          uuid: Math.random(),
        }}
      />
    </ContainerContext.Provider>
  ))
  .add('Sub', () => (
    <ContainerContext.Provider value={containerStyle.wide}>
      <BlockHeading
        {...{
          level: 3,
          text: shortSampleText,
          uuid: Math.random(),
        }}
      />
      <BlockHeading
        {...{
          level: 3,
          text: shortSampleText,
          url: '#link',
          uuid: Math.random(),
        }}
      />
    </ContainerContext.Provider>
  ))
  .add('Sub sub', () => (
    <ContainerContext.Provider value={containerStyle.wide}>
      <BlockHeading
        {...{
          level: 4,
          text: shortSampleText,
          uuid: Math.random(),
        }}
      />
      <BlockHeading
        {...{
          level: 4,
          text: shortSampleText,
          url: '#link',
          uuid: Math.random(),
        }}
      />
    </ContainerContext.Provider>
  ))

storiesOf('Blocks/Hero Image', module).add('Hero Image', () => (
  <ContainerContext.Provider value={containerStyle.wide}>
    <BlockHeroImage
      {...{
        buttonUrl: '#here',
        image: {
          url: 'https://placekitten.com/g/2000/900',
        },
        headline: shortSampleText,
      }}
    />
  </ContainerContext.Provider>
))

storiesOf('Blocks/Image', module)
  .add('Image', () => (
    <ContainerContext.Provider value={containerStyle.wide}>
      <BlockImage
        {...{
          image: {
            url: 'https://placekitten.com/300/300',
          },
          description: shortSampleText,
        }}
      />
    </ContainerContext.Provider>
  ))
  .add('Pull right', () => (
    <ContainerContext.Provider value={containerStyle.wide}>
      <BlockImage
        {...{
          image: {
            url: 'https://placekitten.com/300/300',
          },
          pullRight: true,
          description: shortSampleText,
        }}
      />
    </ContainerContext.Provider>
  ))

storiesOf('Blocks/Image Grid', module)
  .add('2 wide', () => (
    <ContainerContext.Provider value={containerStyle.wide}>
      <BlockImageGrid
        {...{
          images: [
            {
              headline: 'A cute cat',
              text: 'This cat is so cute!',
              link: '/cat',
              image: {
                url: 'http://placekitten.com/g/500/500',
              },
            },
            {
              headline: 'Another cute cat',
              text: 'This cat is also so cute!',
              link: '/cat',
              image: {
                url: 'http://placekitten.com/g/500/500',
              },
            },
          ],
          columnWidth: 6,
        }}
      />
    </ContainerContext.Provider>
  ))
  .add('3 wide', () => (
    <ContainerContext.Provider value={containerStyle.wide}>
      <BlockImageGrid
        {...{
          images: [
            {
              headline: 'A cute cat',
              text: 'This cat is so cute!',
              link: '/cat',
              image: {
                url: 'http://placekitten.com/g/500/500',
              },
            },
            {
              headline: 'Another cute cat',
              text: 'This cat is also so cute!',
              link: '/cat',
              image: {
                url: 'http://placekitten.com/g/500/500',
              },
            },
            {
              headline: 'Another cute cat',
              text: 'This cat is also so cute!',
              link: '/cat',
              image: {
                url: 'http://placekitten.com/g/500/500',
              },
            },
          ],
          columnWidth: 4,
        }}
      />
    </ContainerContext.Provider>
  ))
  .add('4 wide', () => (
    <ContainerContext.Provider value={containerStyle.wide}>
      <BlockImageGrid
        {...{
          images: [
            {
              headline: 'A cute cat',
              text: 'This cat is so cute!',
              link: '/cat',
              image: {
                url: 'http://placekitten.com/g/500/500',
              },
            },
            {
              headline: 'Another cute cat',
              text: 'This cat is also so cute!',
              link: '/cat',
              image: {
                url: 'http://placekitten.com/g/500/500',
              },
            },
            {
              headline: 'Another cute cat',
              text: 'This cat is also so cute!',
              link: '/cat',
              image: {
                url: 'http://placekitten.com/g/500/500',
              },
            },
            {
              headline: 'Another cute cat',
              text: 'This cat is also so cute!',
              link: '/cat',
              image: {
                url: 'http://placekitten.com/g/500/500',
              },
            },
          ],
          columnWidth: 3,
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
        {...{
          type: 'ul',
          list: listItems,
        }}
      />
    </ContainerContext.Provider>
  ))
  .add('Ordered', () => (
    <ContainerContext.Provider value={containerStyle.wide}>
      <BlockList
        {...{
          type: 'ol',
          list: listItems,
        }}
      />
    </ContainerContext.Provider>
  ))
  .add('Unstyled', () => (
    <ContainerContext.Provider value={containerStyle.wide}>
      <BlockList
        {...{
          type: 'list-unstyled',
          list: listItems,
        }}
      />
    </ContainerContext.Provider>
  ))

storiesOf('Blocks/Pathway', module).add('Pathway', () => (
  <ContainerContext.Provider value={containerStyle.wide}>
    <BlockPathway
      {...{
        pathways: [
          {
            course: ' CHEM 109',
            units: '4',
            requirements: ['B1'],
          },
          {
            course: ' MATH 130',
            units: '5',
            requirements: ['B4'],
          },
          {
            course: ' *FYS 183',
            units: '4',
            requirements: ['E'],
          },
          {
            course: 'Language 102',
            units: '4',
            requirements: ['C3', 'Language Proficiency'],
          },
        ],
      }}
    />
  </ContainerContext.Provider>
))
storiesOf('Blocks/Text', module)
  .add('Regular', () => (
    <ContainerContext.Provider value={containerStyle.wide}>
      <BlockText text={sampleText} />
    </ContainerContext.Provider>
  ))
  .add('Lead paragraph', () => (
    <ContainerContext.Provider value={containerStyle.wide}>
      <BlockText {...{ lead: true, text: sampleText }} />
    </ContainerContext.Provider>
  ))

storiesOf('Blocks/Map', module).add('Single point', () => (
  <ContainerContext.Provider value={containerStyle.wide}>
    <BlockMap
      {...{
        zoom: 17,
        center: {
          lat: 36.649733780134,
          lng: -121.79177284241,
        },
        features: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: [-121.79263651371, 36.649771941251],
              },
            },
          ],
        },
        kml: false,
        tall: false,
        fullscreen: false,
      }}
    />
  </ContainerContext.Provider>
))

storiesOf('Blocks/Quote', module)
  .add('Quote', () => (
    <ContainerContext.Provider value={containerStyle.wide}>
      <BlockQuote
        {...{
          quote: sampleText,
        }}
      />
    </ContainerContext.Provider>
  ))
  .add('With source', () => (
    <ContainerContext.Provider value={containerStyle.wide}>
      <BlockQuote
        {...{
          quote: sampleText,
          source: 'Captain Ahab',
        }}
      />
    </ContainerContext.Provider>
  ))
  .add('With source & url', () => (
    <ContainerContext.Provider value={containerStyle.wide}>
      <BlockQuote
        {...{
          quote: sampleText,
          source: 'Captain Ahab',
          url: '#whale',
        }}
      />
    </ContainerContext.Provider>
  ))

storiesOf('Blocks/Related', module).add('Related content', () => (
  <ContainerContext.Provider value={containerStyle.wide}>
    <BlockRelated
      {...{
        source: 'Herman Melville',
        title: 'Call me Ishmael',
        description:
          'I had to move in order to keep from knocking hats off of heads.',
        url: 'https://kevee.github.io/mobydick',
      }}
    />
    <div style={{ clear: 'both' }} />
  </ContainerContext.Provider>
))

storiesOf('Blocks/Sound', module).add('Soundcloud', () => (
  <ContainerContext.Provider value={containerStyle.wide}>
    <BlockSound
      {...{
        id: 59713385,
      }}
    />
  </ContainerContext.Provider>
))

storiesOf('Blocks/Table', module).add('Table', () => (
  <ContainerContext.Provider value={containerStyle.wide}>
    <BlockTable
      {...{
        layout: {
          headers: ['Header A', 'Header B', 'Header C'],
        },
        tableData: [
          ['Item 1', 'Item 2', 'Item 3'],
          ['Item 1', 'Item 2', 'Item 3'],
          ['Item 1', 'Item 2', 'Item 3'],
        ],
      }}
    />
  </ContainerContext.Provider>
))

storiesOf('Blocks/Video', module).add('YouTube', () => (
  <ContainerContext.Provider value={containerStyle.wide}>
    <BlockVideo
      {...{
        provider: {
          id: 'NMPW4R727QQ',
        },
      }}
    />
  </ContainerContext.Provider>
))
