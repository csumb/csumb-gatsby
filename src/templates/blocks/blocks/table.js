import React from 'react'
import { Table, TableHeader, TableRow, TableCell } from 'components/table'
import { ContainerContext, ContainerElement } from './container-context'

class BlockTable extends React.Component {
  render() {
    const { layout, tableData } = this.props
    return (
      <ContainerContext.Consumer>
        {container => (
          <ContainerElement container={container}>
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
        )}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockTable
