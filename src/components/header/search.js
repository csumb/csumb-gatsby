import React from 'react'
import Link from 'gatsby-link'
import VisuallyHidden from '@reach/visually-hidden'
import { navigate } from '@reach/router'
import Portal from 'components/portal'
import Rect from '@reach/rect'
import { InputText } from 'components/forms'
import styled from 'react-emotion'
import { colors } from 'components/styles/theme'

/** A11Y
 *
 * The autocomplete needs work
 */

const SearchResultsAutocomplete = styled('div')`
  position: absolute;
  background: ${colors.white};
  border: 1px solid ${colors.black};
  a {
    display: block;
    text-decoration: none;
    padding: 0.5rem;
    :focus,
    :hover {
      background: ${colors.primary.darkest};
      color: ${colors.white};
    }
  }
`

class SearchResults extends React.Component {
  state = {
    selected: false,
  }

  render() {
    const { search, rect } = this.props
    if (!search || !search.record_count) {
      return null
    }
    return (
      <SearchResultsAutocomplete
        style={{
          top: rect.top + rect.height,
          left: rect.left,
          width: rect.width,
        }}
      >
        {search.records.page.map(item => (
          <div key={item.id}>
            <Link to={item.url.replace('https://csumb.edu', '')}>
              {item.title}
            </Link>
          </div>
        ))}
      </SearchResultsAutocomplete>
    )
  }
}

class Search extends React.Component {
  state = {
    search: false,
    query: false,
  }
  handleChange = this.handleChange.bind(this)
  handleSubmit = this.handleSubmit.bind(this)

  handleChange(event) {
    this.setState({
      query: event.target.value.trim(),
    })

    if (
      !event.target.value.trim().length ||
      event.target.value.trim().length < 3
    ) {
      this.setState({
        search: false,
      })
    }
    window
      .fetch(
        `https://api.swiftype.com/api/v1/public/engines/suggest?engine_key=${
          this.props.swiftypeId
        }&q=${event.target.value.trim().toLowerCase()}`
      )
      .then(response => {
        return response.json()
      })
      .then(search => {
        this.setState({
          search: search,
        })
      })
      .catch(error => {
        this.setState({
          search: false,
        })
      })
  }

  handleSubmit(event) {
    event.preventDefault()
    navigate(`/search?q=${this.state.query}`)
  }

  render() {
    return (
      <Rect>
        {({ rect, ref }) => (
          <>
            <InputText
              label="Search"
              name="search"
              forwardedRef={ref}
              autocomplete="false"
              hideLabel={true}
              placeholder="Search"
              onChange={this.handleChange}
              inline
            />
            <Portal>
              {this.state.search ? (
                <SearchResults search={this.state.search} rect={rect} />
              ) : null}
            </Portal>
            <VisuallyHidden>
              <input type="submit" value="Search" />
            </VisuallyHidden>
          </>
        )}
      </Rect>
    )
  }
}

export default Search
