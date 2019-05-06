import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import {
  Table,
  TableRow,
  TableHeader,
  TableCell,
} from 'components/common/table'
import typography from 'style/typography'

typography.injectStyles()

storiesOf('Table', module).add('Table', () => (
  <Table>
    <thead>
      <TableRow>
        <TableHeader>Header A</TableHeader>
        <TableHeader>Header B</TableHeader>
        <TableHeader>Header C</TableHeader>
      </TableRow>
    </thead>
    <tbody>
      <TableRow>
        <TableCell>Item 1</TableCell>
        <TableCell>Item 2</TableCell>
        <TableCell>Item 3</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Item 1</TableCell>
        <TableCell>Item 2</TableCell>
        <TableCell>Item 3</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Item 1</TableCell>
        <TableCell>Item 2</TableCell>
        <TableCell>Item 3</TableCell>
      </TableRow>
    </tbody>
  </Table>
))
