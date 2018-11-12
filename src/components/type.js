import styled from 'react-emotion'
import { colors } from 'components/styles/theme'

const LeadParagraph = styled('p')`
  font-size: 1.3rem;
`

const HelpParagraph = styled('p')`
  font-size: 0.8rem;
  color: ${colors.muted.dark};
`

export { LeadParagraph, HelpParagraph }
