import styled from '@emotion/styled'
import { bp } from '../../style'

const spacingValues = value => {
  return Array.isArray(value)
    ? value.map(b => (b = b * 4 + 'px'))
    : value * 4 + 'px'
}

const Flex = styled('div')`
  box-sizing: border-box;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
`

const Box = styled('div')`
  box-sizing: border-box;
  ${props => props.pr && bp({ paddingRight: spacingValues(props.pr) })}
  ${props => props.pl && bp({ paddingRight: spacingValues(props.pl) })}
  ${props =>
    props.px &&
    bp({
      paddingRight: spacingValues(props.px),
      paddingLeft: spacingValues(props.px),
    })}
  ${props =>
    props.py &&
    bp({
      paddingTop: spacingValues(props.py),
      paddingBottom: spacingValues(props.py),
    })}
  ${props => props.order && bp({ order: props.order })}
  ${props => props.mr && bp({ marginRight: spacingValues(props.mr) })}
  ${props => props.ml && bp({ marginLeft: spacingValues(props.ml) })}
  ${props =>
    props.mx &&
    bp({
      marginRight: spacingValues(props.mx),
      marginLeft: spacingValues(props.mx),
    })}
  ${props =>
    props.width &&
    bp({
      width: Array.isArray(props.width)
        ? props.width.map(b => (b = b * 100 + '%'))
        : props.width * 100 + '%',
    })}
`

export { Flex, Box }
