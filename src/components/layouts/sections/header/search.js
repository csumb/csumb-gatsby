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
  state = {
    value: '',
    results: [],
    error: false,
  }
  render() {
    const { results, value } = this.state
    return (
      <>
        <VisuallyHidden>
          <label htmlFor="csumb-search">Search campus website</label>
        </VisuallyHidden>
        <Autocomplete
          items={results}
          value={value}
          getItemValue={item => item.title}
          renderItem={(item, isHighlighted) => (
            <SearchAutocompleteItem
              key={item.url}
              isHighlighted={isHighlighted}
            >
              {item.title}
              <SearchAutocompleteItemSite isHighlighted={isHighlighted}>
                {Array.isArray(item.site_name) ? (
                  <>{item.site_name[0]}</>
                ) : (
                  <>{item.site_name}</>
                )}
              </SearchAutocompleteItemSite>
            </SearchAutocompleteItem>
          )}
          renderMenu={(items, value, style) => {
            if (value === '') {
              return <span />
            }
            return <SearchResultsAutocomplete children={items} />
          }}
          onSelect={(value, item) => {
            navigate(item.url.replace('https://csumb.edu', ''))
          }}
          renderInput={props => {
            return (
              <SearchInput
                placeholder="Search CSUMB"
                id="csumb-search"
                {...props}
                onKeyDown={event => {
                  if (event.key === 'Enter') {
                    navigate(`/search?q=${event.target.value}`)
                  }
                }}
              />
            )
          }}
          onChange={(event, value) => {
            this.setState({
              value: value,
            })
            fetch(
              `https://api.swiftype.com/api/v1/public/engines/suggest?engine_key=${
                process.env.GATSBY_CSUMB_SWIFTYPE_ID
              }&q=${value.trim().toLowerCase()}`
            )
              .then(response => {
                return response.json()
              })
              .then(search => {
                this.setState({
                  results: search.records.page,
                })
              })
              .catch(error => {
                this.setState({
                  results: [],
                  error: true,
                })
              })
          }}
        />
      </>
    )
  }
}

export default Search
