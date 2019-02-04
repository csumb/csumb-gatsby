import bp from 'components/styles/breakpoints'
import styled from '@emotion/styled'

const NewsContainer = styled('div')`
  ${bp({
    marginLeft: ['1rem', '1rem', 'auto'],
    marginRight: ['1rem', '1rem', 'auto'],
    maxWidth: '66ch',
  })}
`

export default NewsContainer
