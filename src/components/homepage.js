import React from 'react'
import styled from 'react-emotion'
import moment from 'moment'
import { colors, fonts } from 'components/styles/theme'


const dateFormat = 'MMMM D, YYYY'

const Story = styled('div')`
${props => props.featured ? `margin-bottom: 1.5rem` : `margin-bottom: 1rem`};
&:hover {
  a {
    text-decoration: underline;
  }
}
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
background: ${colors.muted.bright};
padding: 0.7rem;
`

const NuggetsList = styled('ul')`
margin: 0;
list-style-type: none;
li {
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

const NonFeaturedStory = ({ link, image, title, eventDate }) => (
  <Story>
    <a href={link}>
      <StoryImage alt="" src={image.fixed.src} srcSet={image.fixed.srcSet} />
      <NonFeaturedStoryHeader>
        {title}
      </NonFeaturedStoryHeader>
      {eventDate && (
        <EventDate>
          {moment(eventDate).format(dateFormat)}
        </EventDate>
      )}
    </a>
  </Story>
)

const FeaturedStory = ({ link, image, title, eventDate, childContentfulStoryDescriptionTextNode, childContentfulEventDescriptionTextNode }) => (
  <Story featured>
    <a href={link}>
      <StoryImage alt="" src={image.fixed.src} srcSet={image.fixed.srcSet} />
      <FeaturedStoryHeader>
        {title}
      </FeaturedStoryHeader>
      {eventDate && (
        <FeaturedEventDate>
          {moment(eventDate).format(dateFormat)}
        </FeaturedEventDate>
      )}
    </a>
    <FeaturedStoryDescription>
      {childContentfulStoryDescriptionTextNode && (
        <>
          {childContentfulStoryDescriptionTextNode.description}
        </>
      )}

      {childContentfulEventDescriptionTextNode && (
        <>
          {childContentfulEventDescriptionTextNode.description}
        </>
      )}
    </FeaturedStoryDescription>
  </Story>
)

const Nuggets = ({ nuggets }) => (
  <NuggetsWrapper>
    <NuggetsHeader>
      From around campus
    </NuggetsHeader>
    <NuggetsList>
      {nuggets.map(({ link, title }) => (
        <li>
          <a href={link}>
            {title}
          </a>
        </li>
      ))}
    </NuggetsList>
  </NuggetsWrapper>
)

export { NonFeaturedStory, FeaturedStory, Nuggets }