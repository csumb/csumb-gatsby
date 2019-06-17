import React from 'react'
import styled from '@emotion/styled'
import moment from 'moment'
import { Flex, Box } from '../common/grid'
import { colors, fonts, bp } from '../../style'
import HeroImage from '../common/hero-image'
import { LeadParagraph } from '../common/type'
import LinkInspect from '../utilities/link-inspect'
import Container from '../common/container'
import { ButtonLink } from '../common/button'
import anniversaryBanner from '../../assets/images/25-banner.png'
import Link from 'gatsby-link'
import BreakpointContext from '../contexts/breakpoint'

const dateFormat = 'MMMM D, YYYY'

const Story = styled.div`
  ${props =>
    props.featured ? `margin-bottom: 2rem` : `margin-bottom: 1.5rem`};
  a {
    color: ${colors.black};
    text-decoration: none;
  }
`

const StoryHeader = styled.h2`
  text-decoration: none;
  font-size: 1.6rem;
  font-family: ${fonts.body};
  color: ${colors.black};
  margin: 0;
`

const StoryImage = styled.img`
  width: 100%;
  margin-bottom: 0;
`

const EventDate = styled.div`
  color: ${colors.muted.dark};
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

const AnniversaryBanner = styled.div`
  position: absolute;
  top: 0;
  img {
    ${bp({
      width: ['150px', '200px'],
    })}
  }
  ${bp({
    right: [0, 0, 100],
  })}
`

const HeroImageAnniversaryBanner = () => (
  <AnniversaryBanner>
    <Link to="/25">
      <img src={anniversaryBanner} alt="25 year anniversary - 1994 to 2019" />
    </Link>
  </AnniversaryBanner>
)

const HomepageHero = ({ item }) => (
  <HomepageHeroWrapper
    style={{ height: item.fixedHeight ? `${item.imageHeight}px` : '75vh' }}
  >
    <BreakpointContext.Consumer>
      {context => (
        <HeroImage
          opacity={item.lighten / 100}
          parallaxOffset={item.fixedHeight ? 0 : 100}
          transitionDuration={0}
          imageSrc={
            context.isMobile
              ? item.mobileImage.highquality.src
              : item.image.highquality.src
          }
          lowResImage={
            context.isMobile
              ? item.mobileImage.lowquality.src
              : item.image.lowquality.src
          }
          textPosition={item.textPosition}
          minHeight={item.fixedHeight ? `${item.imageHeight}px` : '75vh'}
        >
          {item.showAnniversaryBanner && <HeroImageAnniversaryBanner />}
          <HeroItem darkImage={item.darkImage}>
            <h2>
              <LinkInspect to={item.link}>{item.title}</LinkInspect>
            </h2>
            <LeadParagraph>{item.description}</LeadParagraph>
          </HeroItem>
        </HeroImage>
      )}
    </BreakpointContext.Consumer>
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

const HomepageStory = ({ link, image, title, eventDate }) => (
  <Story featured>
    <a href={link}>
      <StoryImage
        aria-hidden
        alt=""
        src={image.resize.url}
        srcSet={image.fixed.srcSet}
      />
      <StoryType isEvent={eventDate && true} />
      <StoryHeader>{title}</StoryHeader>
      {eventDate && (
        <EventDate>{moment(eventDate).format(dateFormat)}</EventDate>
      )}
    </a>
  </Story>
)

export {
  HomepageHero,
  HomepageNavigation,
  HomepageStory,
  HomepageImageNavigation,
  MoreItemsButton,
}
