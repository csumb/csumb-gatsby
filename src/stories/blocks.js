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
import BlockMap from 'templates/blocks/blocks/map'
import typography from 'style/typography'
import { sampleText, shortSampleText } from './sample-text'

typography.injectStyles()

storiesOf('Blocks', module)

storiesOf('Blocks/Address').add(
  'Address',
  () => (
    <>
      <BlockAddress
        {...{
          address1: '100 Campus Center',
          address2: 'Building 43',
          city: 'Seaside',
          state: 'CA',
          zip: '93955',
        }}
      />
    </>
  ),
  {
    info:
      'Uses a native `<address>` element to render a mailing address. Can also be configured with phone, fax, email for a general contact form',
  }
)
storiesOf('Blocks/Button', module).add(
  'Button',
  () => (
    <>
      <BlockButton
        {...{
          text: 'This is a button',
          url: '#url',
        }}
      />
    </>
  ),
  {
    info: 'Renders a button using the `ButtonLink` component.',
  }
)
storiesOf('Blocks/Byline', module).add(
  'Byline',
  () => (
    <>
      <BlockByline
        {...{
          dateFormat: 'November 1, 2018',
        }}
      />
    </>
  ),
  {
    info: 'Used for tagging news articles with a consistent byline.',
  }
)

storiesOf('Blocks/Calendar', module).add(
  'Calendar',
  () => (
    <>
      <BlockCalendar
        {...{
          format: 'week',
          calendar:
            'csumb.edu_l26qls3tik5cgfq262kc5tu6fs@group.calendar.google.com',
        }}
      />
    </>
  ),
  {
    info: 'Embeds a google calendar in month, week, or agenda format.',
  }
)

storiesOf('Blocks/Callout', module).add('Callout', () => (
  <>
    <BlockCallout
      {...{
        title: shortSampleText,
        text: sampleText,
        url: '#here',
      }}
    />
  </>
))

storiesOf('Blocks/Definition List', module).add('Definition List', () => (
  <>
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
  </>
))

storiesOf('Blocks/Document', module).add('Document', () => (
  <>
    <BlockDocument
      {...{
        name: 'List of souls aboard the Pequod',
        document: {
          url: '#document',
        },
      }}
    />
  </>
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
    <>
      <BlockFeed
        {...{
          limit: '5',
          title: '',
          showMore: false,
          displayShort: false,
          items: sampleFeed,
        }}
      />
    </>
  ))
  .add('Short display', () => (
    <>
      <BlockFeed
        {...{
          limit: '5',
          title: '',
          showMore: false,
          displayShort: true,
          items: sampleFeed,
        }}
      />
    </>
  ))

storiesOf('Blocks/Form', module).add('Google Form', () => (
  <>
    <BlockForm
      {...{
        provider: {
          provider: 'google',
          form: '1FAIpQLSfkPnvfSSiVFWRB6B6zNF3rfqKOTiUb6qNfJ9a8_DoOzT_45Q',
        },
      }}
    />
  </>
))

storiesOf('Blocks/Headings', module)
  .add('Main', () => (
    <>
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
    </>
  ))
  .add('Sub', () => (
    <>
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
    </>
  ))
  .add('Sub sub', () => (
    <>
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
    </>
  ))

storiesOf('Blocks/Hero Image', module).add('Hero Image', () => (
  <>
    <BlockHeroImage
      {...{
        buttonUrl: '#here',
        buttonText: 'This is a button',
        image: {
          url: 'https://placekitten.com/g/2000/900',
        },
        headline: shortSampleText,
        text: sampleText,
      }}
    />
  </>
))

storiesOf('Blocks/Image', module)
  .add('Image', () => (
    <>
      <BlockImage
        {...{
          image: {
            url: 'https://placekitten.com/300/300',
          },
          description: shortSampleText,
        }}
      />
    </>
  ))
  .add('Pull right', () => (
    <>
      <BlockImage
        {...{
          image: {
            url: 'https://placekitten.com/300/300',
          },
          pullRight: true,
          description: shortSampleText,
        }}
      />
    </>
  ))

storiesOf('Blocks/Image Grid', module)
  .add('2 wide', () => (
    <>
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
    </>
  ))
  .add('3 wide', () => (
    <>
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
    </>
  ))
  .add('4 wide', () => (
    <>
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
    </>
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
    <>
      <BlockList
        {...{
          type: 'ul',
          list: listItems,
        }}
      />
    </>
  ))
  .add('Ordered', () => (
    <>
      <BlockList
        {...{
          type: 'ol',
          list: listItems,
        }}
      />
    </>
  ))
  .add('Unstyled', () => (
    <>
      <BlockList
        {...{
          type: 'list-unstyled',
          list: listItems,
        }}
      />
    </>
  ))

storiesOf('Blocks/Text', module)
  .add('Regular', () => (
    <>
      <BlockText text={sampleText} />
    </>
  ))
  .add('Lead paragraph', () => (
    <>
      <BlockText {...{ lead: true, text: sampleText }} />
    </>
  ))

storiesOf('Blocks/Map', module)
  .add('Single point', () => (
    <>
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
    </>
  ))
  .add('Complex', () => (
    <>
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
                  type: 'Polygon',
                  coordinates: [
                    [
                      [-121.7948305606842, 36.64964770267248],
                      [-121.79481983184816, 36.648984902999665],
                      [-121.79274916648863, 36.648390960784305],
                      [-121.79269552230835, 36.64922592172253],
                      [-121.79088234901428, 36.64920009832402],
                      [-121.79057121276855, 36.649992011939425],
                      [-121.7917513847351, 36.65022441982434],
                      [-121.79285645484924, 36.6505084729534],
                      [-121.7948305606842, 36.64964770267248],
                    ],
                  ],
                },
              },
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Polygon',
                  coordinates: [
                    [
                      [-121.79240584373474, 36.65055151121491],
                      [-121.79036736488342, 36.650009227362354],
                      [-121.79090380668639, 36.64901933429197],
                      [-121.78900480270384, 36.64833931341866],
                      [-121.78873658180238, 36.65056011886431],
                      [-121.79240584373474, 36.65055151121491],
                    ],
                  ],
                },
              },
            ],
          },
          kml: false,
          tall: false,
          fullscreen: false,
        }}
      />
    </>
  ))

storiesOf('Blocks/Quote', module)
  .add('Quote', () => (
    <>
      <BlockQuote
        {...{
          quote: sampleText,
        }}
      />
    </>
  ))
  .add('With source', () => (
    <>
      <BlockQuote
        {...{
          quote: sampleText,
          source: 'Captain Ahab',
        }}
      />
    </>
  ))
  .add('With source & url', () => (
    <>
      <BlockQuote
        {...{
          quote: sampleText,
          source: 'Captain Ahab',
          url: '#whale',
        }}
      />
    </>
  ))

storiesOf('Blocks/Related', module).add('Related content', () => (
  <>
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
  </>
))

storiesOf('Blocks/Sound', module).add('Soundcloud', () => (
  <>
    <BlockSound
      {...{
        id: 59713385,
      }}
    />
  </>
))

storiesOf('Blocks/Table', module).add('Table', () => (
  <>
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
  </>
))

storiesOf('Blocks/Video', module).add('YouTube', () => (
  <>
    <BlockVideo
      {...{
        provider: {
          id: 'NMPW4R727QQ',
        },
      }}
    />
  </>
))
