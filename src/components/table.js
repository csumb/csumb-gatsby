import styled from 'styled-components'
import { colors } from 'components/styles/theme'

const Table = styled('table')`
  th,
  td {
    padding: 0.4rem;
  }
  ${props =>
    props.bordered
      ? `
      border-bottom: 1px solid ${colors.primary.dark};
  td,th {
    border: 1px solid ${colors.primary.dark};
  } 
  `
      : `
  tr {
    border-bottom: 1px solid ${colors.primary.dark};
  }    
  `};
`

const TableHeader = styled('th')`
  background: ${colors.muted.bright};
`

const TableCell = styled('td')``

const TableRow = styled('tr')``

export { Table, TableRow, TableHeader, TableCell }
