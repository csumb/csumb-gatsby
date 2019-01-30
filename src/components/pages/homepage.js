import React from 'react'
import styled from '@emotion/styled'
import moment from 'moment'
import Link from 'gatsby-link'
import { Flex, Box } from '@rebass/grid'
import { colors, fonts } from 'components/styles/theme'

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
  font-family: ${fonts.sansSerif};
  margin: 0;
  color: ${colors.black};
`

const FeaturedStoryHeader = styled('h2')`
  text-decoration: none;
  font-size: 1.8rem;
  font-family: ${fonts.sansSerif};
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

const NuggetsHeader = styled('h3')`
  font-size: 1rem;
  font-weight: 700;
  padding-bottom: 0.5rem;
  margin-bottom: 0.7rem;
  font-family: ${fonts.sansSerif};
  border-bottom: 3px solid ${colors.black};
`

const NavigationHeader = styled('h3')`
  font-family: ${fonts.sansSerif};
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

const NonFeaturedStory = ({ contentful_id, link, image, title, eventDate }) => (
  <Story>
    <a href={link}>
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
  childContentfulStoryDescriptionTextNode,
  childContentfulEventDescriptionTextNode,
}) => (
  <Story featured>
    <a href={link}>
      <StoryImage alt="" src={image.fixed.src} srcSet={image.fixed.srcSet} />
      <FeaturedStoryHeader>{title}</FeaturedStoryHeader>
      {eventDate && (
        <FeaturedEventDate>
          {moment(eventDate).format(dateFormat)}
        </FeaturedEventDate>
      )}
    </a>
    <FeaturedStoryDescription>
      {childContentfulStoryDescriptionTextNode && (
        <>{childContentfulStoryDescriptionTextNode.description}</>
      )}

      {childContentfulEventDescriptionTextNode && (
        <>{childContentfulEventDescriptionTextNode.description}</>
      )}
    </FeaturedStoryDescription>
  </Story>
)

const Nuggets = ({ nuggets }) => (
  <NuggetsWrapper>
    <NuggetsHeader>From around campus</NuggetsHeader>
    <NuggetsList>
      {nuggets.map(({ contentful_id, link, title }) => (
        <li key={contentful_id}>
          <a href={link}>{title}</a>
        </li>
      ))}
    </NuggetsList>
  </NuggetsWrapper>
)

export { HomepageNavigation, NonFeaturedStory, FeaturedStory, Nuggets }
