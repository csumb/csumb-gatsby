import React from 'react'
import styled from '@emotion/styled'
import moment from 'moment'
import { Flex, Box } from 'components/common/grid'
import { colors, fonts } from 'style/theme'
import HeroImage from 'components/common/hero-image'
import { LeadParagraph } from 'components/common/type'
import showdown from 'showdown'
import bp from 'style/breakpoints'
import LinkInspect from 'components/utilities/link-inspect'
import Container from 'components/common/container'
import { ButtonLink } from 'components/common/button'

const dateFormat = 'MMMM D, YYYY'

const Story = styled.div`
  ${props =>
    props.featured ? `margin-bottom: 2rem` : `margin-bottom: 1.5rem`};
  a {
    color: ${colors.black};
    text-decoration: none;
  }
`

const NonFeaturedStoryHeader = styled.h3`
  text-decoration: none;
  font-family: ${fonts.body};
  margin: 0;
  color: ${colors.black};
`

const FeaturedStoryHeader = styled.h2`
  text-decoration: none;
  font-size: 1.8rem;
  font-family: ${fonts.body};
  color: ${colors.black};
  margin: 0;
`

const StoryImage = styled.img`
  width: 100%;
  margin-bottom: 0;
`

const FeaturedStoryDescription = styled.p`
  margin-top: 0.5rem;
  margin-bottom: 0;
  font-size: 120%;
`
const EventDate = styled.div`
  color: ${colors.muted.dark};
`

const FeaturedEventDate = styled.div`
  color: ${colors.muted.dark};
`

const InTheNewsWrapper = styled.div`
  background: ${colors.muted.light};
  padding: 0.7rem;
`

const InTheNewsList = styled.ul`
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

const InTheNewsSource = styled.div`
  font-variant: italic;
  font-size: 0.8rem;
`

const InTheNewsHeader = styled.h3`
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

const NavigationHeader = styled.h3`
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
const HeroItem = styled.div`
  ${props => props.darkImage && `color: ${colors.white};`}
  h2 {
    margin: 0;
    font-family: ${fonts.body};
    font-size: 2.5rem;
  }
  a {
    ${props =>
      props.darkImage ? `color: ${colors.white};` : `color: ${colors.black};`}
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

const StoryLabel = styled.p`
  color: ${colors.primary.dark};
  font-weight: bold;
  margin-bottom: 0.2rem;
`

const HomepageImageNavigationWrapper = styled.div`
  background: ${colors.primary.dark};
  padding: 1.5rem 0;
  h3 {
    ${bp({
      marginBottom: ['1rem', 0],
    })}
  }
  a {
    color: ${colors.white};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

const NavigationImage = styled.img`
  ${bp({
    display: ['none', 'block'],
  })}
  margin-bottom: 0.2rem;
`

const MoreItemsButton = styled(ButtonLink)`
  margin: 1rem 1.5rem;
`

const HomepageHeroWrapper = styled.div``

const HomepageImageNavigation = ({ navigation }) => {
  const titles = navigation.childContentfulHomepageImageNavigationDisplayNamesTextNode.childMarkdownRemark.rawMarkdownBody.split(
    '\n'
  )
  const links = navigation.childContentfulHomepageImageNavigationLinksTextNode.childMarkdownRemark.rawMarkdownBody.split(
    '\n'
  )
  const alt = navigation.childContentfulHomepageImageNavigationAlternativeTextTextNode.childMarkdownRemark.rawMarkdownBody.split(
    '\n'
  )
  const images = navigation.images
  return (
    <HomepageImageNavigationWrapper>
      <Container>
        <Flex>
          {images.map((image, key) => (
            <Box width={[1, 1 / 4]} px={[0, 2]} key={key}>
              <LinkInspect to={links[key]}>
                <NavigationImage src={image.file.url} alt={alt[key]} />
                <h3>{titles[key]}</h3>
              </LinkInspect>
            </Box>
          ))}
        </Flex>
      </Container>
    </HomepageImageNavigationWrapper>
  )
}

const StoryType = ({ isEvent }) => (
  <StoryLabel>{isEvent ? <>Event</> : <>News</>}</StoryLabel>
)

const HomepageHero = ({ item }) => (
  <HomepageHeroWrapper
    style={{ height: item.fixedHeight ? `${item.imageHeight}px` : '75vh' }}
  >
    <HeroImage
      opacity={item.lighten / 100}
      parallaxOffset={item.fixedHeight ? 0 : 100}
      transitionDuration={0}
      imageSrc={item.image.file.url}
      lowResImage={item.image.resize.src}
      minHeight={item.fixedHeight ? `${item.imageHeight}px` : '75vh'}
    >
      <HeroItem darkImage={item.darkImage}>
        <h2>
          <LinkInspect to={item.link}>{item.title}</LinkInspect>
        </h2>
        <LeadParagraph>{item.description}</LeadParagraph>
      </HeroItem>
    </HeroImage>
  </HomepageHeroWrapper>
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
      <StoryImage alt="" src={image.file.url} />
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
  HomepageImageNavigation,
  MoreItemsButton,
}
