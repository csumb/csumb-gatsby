import React from 'react'
import styled from 'react-emotion'
import { colors } from 'components/styles/theme'

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
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScST28lvvCwNZvDQPnScwRATH5jbB86LoaKSNyBlvI-fr0unA/viewform?usp=sf_link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Give feedback!
        </a>
      </FeedbackTabItem>
    )
  }
}

export default FeedbackTab
