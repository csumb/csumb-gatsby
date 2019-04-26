import React from 'react'
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
} from 'components/common/table'
import parseHtml from '../parse-html'

class BlockTable extends React.Component {
  render() {
    const { layout, tableData } = this.props
    return (
      <Table>
        <thead>
          <TableRow>
            {layout.headers.map(header => (
              <TableHeader>{header}</TableHeader>
            ))}
          </TableRow>
        </thead>
        <tbody>
          {tableData.map(row => (
            <TableRow>
              {row.map(cell => (
                <TableCell>{parseHtml(cell)}</TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </Table>
    )
  }
}

export default BlockTable
