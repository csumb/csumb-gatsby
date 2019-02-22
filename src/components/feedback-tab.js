import React from 'react'
import styled from 'react-emotion'
import { colors } from 'style/theme'
import Container from 'components/container'
import { Global, css } from '@emotion/core'
const FeedbackTabItem = styled('div')`
  position: fixed;
  bottom: 0;
  right: 10px;
  background: ${colors.primary.light};
  padding: 0.5rem;
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
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScST28lvvCwNZvDQPnScwRATH5jbB86LoaKSNyBlvI-fr0unA/viewform?usp=sf_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Give us feedback on the new site
          </a>
        </Container>
      </FeedbackTabItem>
    )
  }
}

export default FeedbackTab
