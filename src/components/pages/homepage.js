import React from 'react'
import styled from '@emotion/styled'
import moment from 'moment'
import Link from 'gatsby-link'
import { Flex, Box } from '@rebass/grid/emotion'
import { colors, fonts } from 'style/theme'
import LazyHero from 'react-lazy-hero'
import { LeadParagraph } from 'components/type'
import showdown from 'showdown'
import Container from 'components/container'
import footerAthletics from 'assets/images/homepage/athletics.jpg'
import footerMajorsPrograms from 'assets/images/homepage/majors-programs.jpg'
import footerResidentialLife from 'assets/images/homepage/residential-life.jpg'

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
  margin-bottom: 0;
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

const InTheNewsWrapper = styled('div')`
  background: ${colors.muted.light};
  padding: 0.7rem;
`

const InTheNewsList = styled('ul')`
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

const InTheNewsSource = styled('div')`
  font-variant: italic;
  font-size: 0.8rem;
`

const InTheNewsHeader = styled('h3')`
  font-size: 1rem;
  font-weight: 700;
  padding-bottom: 0.5rem;
  margin-bottom: 0.7rem;
  font-family: ${fonts.body};
  border-bottom: 3px solid ${colors.black};
`

const NavigationWrap = styled(Flex)`
  margin-bottom: 1rem;
`

const NavigationHeader = styled('h3')`
  font-family: ${fonts.body};
  margin-bottom: 0;
`

const NavigationItem = styled(Box)`
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

const StoryLabel = styled('p')`
  color: ${colors.primary.dark};
  font-weight: bold;
  margin-bottom: 0.2rem;
`

const HomepageFooterWrapper = styled('div')`
  background: ${colors.primary.dark};
  margin-top: 1rem;
  padding: 1.5rem 0;
  img {
    margin: 0;
    max-height: 200px;
  }
  h3 {
    margin: 0;
  }
  a {
    color: ${colors.white};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

const HomepageFooter = () => (
  <HomepageFooterWrapper>
    <Container>
      <Flex flexWrap="wrap">
        <Box width={[1, 1 / 3]} pr={[0, 3]}>
          <a href="https://otterathletics.com">
            <img src={footerAthletics} alt="" />
            <h3>Athletics</h3>
          </a>
        </Box>
        <Box width={[1, 1 / 3]} pr={[0, 3]}>
          <Link to="/academics">
            <img src={footerMajorsPrograms} alt="" />
            <h3>Majors &amp; Programs</h3>
          </Link>
        </Box>
        <Box width={[1, 1 / 3]}>
          <Link to="/housing">
            <img src={footerResidentialLife} alt="" />
            <h3>Residential Life</h3>
          </Link>
        </Box>
      </Flex>
    </Container>
  </HomepageFooterWrapper>
)

const StoryType = ({ isEvent }) => (
  <StoryLabel>{isEvent ? <>Event</> : <>News</>}</StoryLabel>
)

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
  <NavigationWrap flexWrap="wrap">
    {items[0].node.items.map(item => (
      <Box width={[1, 1 / 4]} px={2} key={item.contentful_id}>
        <NavigationItem>
          <a href={item.link}>
            <NavigationHeader>{item.title}</NavigationHeader>
          </a>
        </NavigationItem>
      </Box>
    ))}
  </NavigationWrap>
)

const NonFeaturedStory = ({ news_story, link, image, title, eventDate }) => (
  <Story>
    <a href={getNewsLink(news_story, link)}>
      <StoryImage alt="" src={image.fixed.src} srcSet={image.fixed.srcSet} />
      <StoryType isEvent={eventDate && true} />
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
      <StoryType isEvent={eventDate && true} />
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

const InTheNews = ({ articles }) => {
  const converter = new showdown.Converter()
  return (
    <InTheNewsWrapper>
      <InTheNewsHeader>In the news</InTheNewsHeader>
      <InTheNewsList>
        {articles.map(({ node }) => (
          <li key={node.contentful_id}>
            <a href={node.link}>
              <>
                <div
                  dangerouslySetInnerHTML={{
                    __html: converter.makeHtml(
                      node.childContentfulHomepageInTheNewsHeadlineTextNode
                        .childMarkdownRemark.rawMarkdownBody
                    ),
                  }}
                />
                {node.source && (
                  <InTheNewsSource>{node.source}</InTheNewsSource>
                )}
              </>
            </a>
          </li>
        ))}
      </InTheNewsList>
    </InTheNewsWrapper>
  )
}

export {
  HomepageHero,
  HomepageNavigation,
  NonFeaturedStory,
  FeaturedStory,
  InTheNews,
  HomepageFooter,
}
