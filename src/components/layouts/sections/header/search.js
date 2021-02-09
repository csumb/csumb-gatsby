import React, { Component } from 'react'
import styled from '@emotion/styled'
import { colors } from '../../../../style'
import { navigate } from '@reach/router'
import Autocomplete from 'react-autocomplete'
import VisuallyHidden from '../../../utilities/visually-hidden'

const SearchResultsAutocomplete = styled('div')`
  background: ${colors.white};
  border: 1px solid ${colors.black};
  text-align: left;
  position: absolute;
  z-index: 1000;
`

const SearchAutocompleteItemSite = styled('span')`
  font-size: 0.6rem;
  font-weight: normal;
  color: ${colors.muted.dark};
  display: block;
  ${props =>
    props.isHighlighted &&
    `
    color: ${colors.white};
  `}
`

const SearchAutocompleteItem = styled('div')`
  color: ${colors.black};
  cursor: pointer;
  text-decoration: none;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  font-weight: bold;
  line-height: normal;
  text-align: left;
  ${props =>
    props.isHighlighted &&
    `
    background: ${colors.primary.darkest};
    color: ${colors.white};
  `}
`

const SearchInput = styled('input')`
  border: 1px solid ${colors.gray.deafult};
  padding: 0.3rem;
  width: 100%;
  border-radius: 0;
`
class Search extends Component {
  render() {
    return (
      <form method="get" title="Search Form" action="/search">
        <div>
          <input
            type="text"
            id="q"
            name="q"
            title="Search this site"
            alt="Search Text"
            maxlength="256"
          />
          <input
            type="hidden"
            id="cx"
            name="cx"
            value="017752867313261290055:qexsyyoilns"
          />
          <input
            type="image"
            id="searchSubmit"
            name="submit"
            src="https://www.flaticon.com/free-icon/active-search-symbol_34148"
            alt="Go"
            title="Submit Search Query"
          />
        </div>
      </form>
    )
  }
}

export default Search
