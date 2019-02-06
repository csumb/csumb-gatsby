import React from 'react'
import styled from 'react-emotion'
import { colors } from 'components/styles/theme'
import Container from 'components/container'
import { Global, css } from '@emotion/core'
const FeedbackTabItem = styled('div')`
  position: fixed;
  bottom: 0;
  right: 10px;
  background: ${colors.primary.light};
  padding: 0.5rem;
  width: 100%;
`

class FeedbackTab extends React.Component {
  render() {
    return (
      <FeedbackTabItem>
        <Global
          styles={css`
            body {
              padding-bottom: 3rem;
            }
          `}
        />
        <Container>
          The CSUMB website will be updated to improve the functionality of the
          dashboard and the appearance of the site.{' '}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScST28lvvCwNZvDQPnScwRATH5jbB86LoaKSNyBlvI-fr0unA/viewform?usp=sf_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Please take a look around and give us your feedback!
          </a>
        </Container>
      </FeedbackTabItem>
    )
  }
}

export default FeedbackTab
