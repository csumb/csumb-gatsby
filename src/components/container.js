import styled from '@emotion/styled'
import bp from 'components/styles/breakpoints'
import facepaint from 'facepaint'

const breakpoints = [0, 1110]

const mq = facepaint(breakpoints.map(bp => `@media (min-width: ${bp}px)`))

const Container = styled('div')`
  ${props =>
    props.topPadding &&
    `
    padding-top: 1.5rem;
  `}
  max-width: 1100px;
  margin: 0 auto;
  ${mq({
      paddingLeft: ['1.5rem', '0'],
      paddingRight: ['1.5rem', '0'],
    })}
`

export default Container
