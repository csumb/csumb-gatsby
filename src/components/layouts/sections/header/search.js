import React, { Component } from 'react'
import styled from '@emotion/styled'
import { colors } from '../../../../style'

const SearchInput = styled('input')`
  border: 1px solid ${colors.gray.default};
  padding: 0.3rem;
  border-radius: 0;
`
class Search extends Component {
  render() {
    return (
      <form method="get" title="Search Form" action="/search">
        <div>
          <SearchInput
            type="text"
            id="q"
            name="q"
            title="Search this site"
            placeholder="Search CSUMB"
            alt="Search Text"
            maxlength="256"
          />
          <input
            type="hidden"
            id="cx"
            name="cx"
            value="017752867313261290055:qexsyyoilns"
          />
        </div>
      </form>
    )
  }
}

export default Search
