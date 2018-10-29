import styled from 'react-emotion'
import theme from 'components/styles/theme'

const Table = styled('table')`
  th,
  td {
    padding: 0.4rem;
  }
  ${props =>
    props.bordered
      ? `
      border-bottom: 1px solid ${theme.colors.primary.dark};
  td,th {
    border: 1px solid ${theme.colors.primary.dark};
  } 
  `
      : `
  tr {
    border-bottom: 1px solid ${theme.colors.primary.dark};
  }    
  `};
`

const TableHeader = styled('th')`
  background: ${theme.colors.muted.bright};
`

const TableCell = styled('td')``

const TableRow = styled('tr')``

export { Table, TableRow, TableHeader, TableCell }
