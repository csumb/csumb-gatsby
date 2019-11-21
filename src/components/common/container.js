import styled from '@emotion/styled'
import facepaint from 'facepaint'

const baseWidth = 1100

const mq = facepaint([`@media (min-width: ${baseWidth}px)`])

const Container = styled('div')`
  ${props =>
    props.topPadding &&
    `
    padding-top: 1.5rem;
  `}
  max-width: ${baseWidth}px;
  ${mq({
    marginLeft: ['1rem', 'auto'],
    marginRight: ['1rem', 'auto'],
  })}
`

export default Container
