import styled from '@emotion/styled'
import { colors, fonts } from '../../style'

const CloseDialog = styled('button')`
  cursor: pointer;
  background: transparent;
  float: right;
  font-size: 1.4rem;
  border: none;
  margin-top: -1rem;
  margin-right: -1rem;
`

const DashboardCard = styled('div')`
  background: ${colors.white};
  padding: 0.5rem;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
`

const DashboardCardHeader = styled('h3')`
  font-family: ${fonts.body};
  padding-right: 1rem;
  ${props =>
    props.noMargin &&
    `
    margin-bottom: 0;
  `};
`

const DashboardMessageClose = styled('button')`
  border: 0;
  background: transparent;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 1rem;
  font-weight: bold;
  color: ${colors.muted.dark};
`

export {
  CloseDialog,
  DashboardCard,
  DashboardCardHeader,
  DashboardMessageClose,
}
