import styled from '@emotion/styled'
import { colors } from '../../style'

const LeadParagraph = styled.p`
  font-size: 1.3rem;
`

const HeroParagraph = styled.p`
  font-size: 2rem;
  font-weight: bold;
`

const HelpParagraph = styled.p`
  font-size: 0.8rem;
  color: ${colors.muted.dark};
`

const UnstyledList = styled.ul`
  list-style-type: none;
  margin-left: 0;
`

export { LeadParagraph, HeroParagraph, HelpParagraph, UnstyledList }
