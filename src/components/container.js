import styled from 'styled-components'
import bp from 'components/styles/breakpoints'

const Container = styled('div')`
  ${props =>
    props.topPadding &&
    `
    padding-top: 1.5rem;
  `}
  ${bp({
    marginLeft: ['1rem', '1rem', 'auto'],
    marginRight: ['1rem', '1rem', 'auto'],
    maxWidth: '1100px',
  })}
`

export default Container
