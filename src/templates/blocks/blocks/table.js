import React from 'react'
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
} from '../../../components/common/table'
import parseHtml from '../parse-html'
import BreakpointContext from '../../../components/contexts/breakpoint'

const BlockTable = ({ layout, tableData }) => {
  return (
    <BreakpointContext.Consumer>
      {context => (
        <Table isMobile={context.isMobile}>
          <thead>
            <TableRow>
              {layout.headers.map(header => (
                <TableHeader>{header}</TableHeader>
              ))}
            </TableRow>
          </thead>
          <tbody>
            {context.isMobile
              ? tableData.map(row => (
                  <TableRow>
                    {row.map((cell, index) => (
                      <TableCell>
                        <strong>{layout.headers[index]}</strong>{' '}
                        {parseHtml(cell)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : tableData.map(row => (
                  <TableRow>
                    {row.map(cell => (
                      <TableCell>{parseHtml(cell)}</TableCell>
                    ))}
                  </TableRow>
                ))}
          </tbody>
        </Table>
      )}
    </BreakpointContext.Consumer>
  )
}

export default BlockTable
