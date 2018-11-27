import React from 'react'
import { Table, TableHeader, TableRow, TableCell } from 'components/table'
import { ContainerElement } from '../container-context'

class BlockTable extends React.Component {
  render() {
    const { layout, tableData } = this.props
    return (
      <ContainerElement isFull>
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
                  <TableCell dangerouslySetInnerHTML={{ __html: cell }} />
                ))}
              </TableRow>
            ))}
          </tbody>
        </Table>
      </ContainerElement>
    )
  }
}

export default BlockTable
