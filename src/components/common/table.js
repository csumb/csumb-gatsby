import styled from '@emotion/styled'
import { colors } from '../../style'

const Table = styled('table')`
  ${props =>
    props.alternateRows &&
    `
    tbody tr:nth-child(even) {
      background: ${colors.muted.light};
    }
  `}
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

  ${props =>
    props.isMobile &&
    `
    display: block;
    table, thead, tbody, th, td, tr { 
		display: block; 
	}
	
	/* Hide table headers (but not display: none;, for accessibility) */
	thead tr { 
		position: absolute;
		top: -9999px;
		left: -9999px;
	}
	
	tr { 
    border: 1px solid ${colors.muted.mid}; 
    margin-bottom: 0.5rem;
  }
	
	td { 
		border: none;
		position: relative;
    padding-left: 50%; 
	}
	
	td:before { 
		position: absolute;
		top: 6px;
		left: 6px;
		width: 45%; 
		padding-right: 10px; 
		white-space: nowrap;
	}
  
  
  `}
  th,
  td {
    padding: 0.4rem;
  }
`

const TableHeader = styled('th')`
  background: ${colors.muted.bright};
`

const TableCell = styled('td')``

const TableRow = styled('tr')``

export { Table, TableRow, TableHeader, TableCell }
