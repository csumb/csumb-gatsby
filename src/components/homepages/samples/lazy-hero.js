import React from 'react'
import LazyHero from 'react-lazy-hero'
import { colors, fonts } from 'components/styles/theme'
import styled from 'react-emotion'
import Link from 'gatsby-link'
import { LeadParagraph } from 'components/type'

const HeroItem = styled('div')`
  h2 {
    margin: 0;
    font-family: ${fonts.sansSerif};
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

class HomepageHero extends React.Component {

  render() {
    return (
      <LazyHero
        opacity={0.3}
        parallaxOffset={100}
        transitionDuration={0}
        imageSrc="https://cdn.filepicker.io/api/file/dnVXbrfdTuTUkR5hS5Kw">
        <HeroItem>
          <h2>
            <Link to="/scienceillustration">Illustrating life</Link>
          </h2>
          <LeadParagraph>Try your hand at Science Illustration this summer.</LeadParagraph>
        </HeroItem>
      </LazyHero>
    )
  }

}

export default HomepageHero