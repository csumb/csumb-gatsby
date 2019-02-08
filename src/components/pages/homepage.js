import React from 'react'
import styled from '@emotion/styled'
import moment from 'moment'
import Link from 'gatsby-link'
import { Flex, Box } from '@rebass/grid/emotion'
import { colors, fonts } from 'components/styles/theme'
import LazyHero from 'react-lazy-hero'
import { LeadParagraph } from 'components/type'

const dateFormat = 'MMMM D, YYYY'

const Story = styled('div')`
  ${props =>
    props.featured ? `margin-bottom: 2rem` : `margin-bottom: 1.5rem`};
  a {
    color: ${colors.black};
    text-decoration: none;
  }
`

const NonFeaturedStoryHeader = styled('h3')`
  text-decoration: none;
  font-family: ${fonts.body};
  margin: 0;
  color: ${colors.black};
`

const FeaturedStoryHeader = styled('h2')`
  text-decoration: none;
  font-size: 1.8rem;
  font-family: ${fonts.body};
  color: ${colors.black};
  margin: 0;
`

const StoryImage = styled('img')`
  width: 100%;
  margin-bottom: 0.2rem;
`

const FeaturedStoryDescription = styled('p')`
  margin-top: 0.5rem;
  margin-bottom: 0;
  font-size: 120%;
`
const EventDate = styled('div')`
  color: ${colors.muted.dark};
`

const FeaturedEventDate = styled('div')`
  color: ${colors.muted.dark};
`

const NuggetsWrapper = styled('div')`
  background: ${colors.muted.light};
  padding: 0.7rem;
`

const NuggetsList = styled('ul')`
  margin: 0;
  list-style-type: none;
  li {
    line-height: 120%;
    a {
      color: ${colors.black};
      font-weight: 300;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`

const NuggetArrow = styled('span')`
  display: inline-block;
  float: right;
`

const NuggetSource = styled('div')`
  font-variant: italic;
  font-size: 0.8rem;
`

const NuggetsHeader = styled('h3')`
  font-size: 1rem;
  font-weight: 700;
  padding-bottom: 0.5rem;
  margin-bottom: 0.7rem;
  font-family: ${fonts.body};
  border-bottom: 3px solid ${colors.black};
`

const NavigationHeader = styled('h3')`
  font-family: ${fonts.body};
  margin-bottom: 0.3rem;
`

const NavigationItem = styled(Box)`
  margin-bottom: 1rem;
  border: 3px solid ${colors.white};
  padding: 1rem;
  height: 100%;
  a {
    color: ${colors.black};
    text-decoration: none;
    &:visited {
      color: ${colors.black};
    }
  }
  &:hover {
    background: ${colors.primary.dark};
    color: ${colors.white};
    a {
      color: ${colors.white};
    }
  }
`
const HeroItem = styled('div')`
  h2 {
    margin: 0;
    font-family: ${fonts.body};
    font-size: 2.5rem;
  }
  a {
    color: ${colors.black};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

const HomepageHero = ({ item }) => (
  <LazyHero
    opacity={item.lighten / 100}
    parallaxOffset={item.fixedHeight ? 0 : 100}
    transitionDuration={0}
    imageSrc={item.image.file.url}
    minHeight={item.fixedHeight ? `${item.imageHeight}px` : '80vh'}
  >
    <HeroItem>
      <h2>
        <Link to={item.link}>{item.title}</Link>
      </h2>
      <LeadParagraph>{item.description}</LeadParagraph>
    </HeroItem>
  </LazyHero>
)

const HomepageNavigation = ({ items }) => (
  <Flex flexWrap="wrap">
    {items[0].node.items.map(item => (
      <Box width={[1, 1 / 3]} px={4} key={item.contentful_id}>
        <NavigationItem>
          <Link to={item.link}>
            <NavigationHeader>{item.title}</NavigationHeader>
            <span>
              {
                item.childContentfulHomepageNavigationItemDescriptionTextNode
                  .description
              }
            </span>
          </Link>
        </NavigationItem>
      </Box>
    ))}
  </Flex>
)

const NonFeaturedStory = ({
  contentful_id,
  news_story,
  link,
  image,
  title,
  eventDate,
}) => (
  <Story>
    <a href={getNewsLink(news_story, link)}>
      <StoryImage alt="" src={image.fixed.src} srcSet={image.fixed.srcSet} />
      <NonFeaturedStoryHeader>{title}</NonFeaturedStoryHeader>
      {eventDate && (
        <EventDate>{moment(eventDate).format(dateFormat)}</EventDate>
      )}
    </a>
  </Story>
)

const FeaturedStory = ({
  link,
  image,
  title,
  eventDate,
  news_story,
  childContentfulHomepageStoryDescriptionTextNode,
  childContentfulHomepageEventDescriptionTextNode,
}) => (
  <Story featured>
    <a href={getNewsLink(news_story, link)}>
      <StoryImage alt="" src={image.fixed.src} srcSet={image.fixed.srcSet} />
      <FeaturedStoryHeader>{title}</FeaturedStoryHeader>
      {eventDate && (
        <FeaturedEventDate>
          {moment(eventDate).format(dateFormat)}
        </FeaturedEventDate>
      )}
    </a>
    <FeaturedStoryDescription>
      {childContentfulHomepageStoryDescriptionTextNode && (
        <>{childContentfulHomepageStoryDescriptionTextNode.description}</>
      )}

      {childContentfulHomepageEventDescriptionTextNode && (
        <>{childContentfulHomepageEventDescriptionTextNode.description}</>
      )}
    </FeaturedStoryDescription>
  </Story>
)

const getNewsLink = (newsStory, link) => {
  if (!newsStory) {
    return link
  }
  return `/news/${moment(newsStory[0].goLiveDate)
    .format('YYYY/MMM/D')
    .toLowerCase()}/${newsStory[0].slug}`
}

const Nuggets = ({ nuggets }) => (
  <NuggetsWrapper>
    <NuggetsHeader>
      <NuggetArrow>↗</NuggetArrow>In the news
    </NuggetsHeader>
    <NuggetsList>
      {nuggets.map(({ contentful_id, link, title, source }) => (
        <li key={contentful_id}>
          <a href={link}>
            <>
              {title}
              {source && <NuggetSource>{source}</NuggetSource>}
            </>
          </a>
        </li>
      ))}
    </NuggetsList>
  </NuggetsWrapper>
)

export {
  HomepageHero,
  HomepageNavigation,
  NonFeaturedStory,
  FeaturedStory,
  Nuggets,
}
