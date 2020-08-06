import styled from '@emotion/styled'
import { colors, bp } from '../../style'

const Well = styled('div')`
  border: 1px solid ${colors.gray.light};
  margin-bottom: 1rem;
  ${bp({
    padding: ['0', '0', '1rem', '1rem'],
  })};
`

export default Well
