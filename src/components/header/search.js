import React from 'react'
import Link from 'gatsby-link'
import VisuallyHidden from '@reach/visually-hidden'
import Rect from '@reach/rect'
import { css } from 'emotion'
import { InputText } from 'components/forms'
import styled from 'react-emotion'
import Portal from 'components/portal'
import { colors } from 'components/styles/theme'
import { navigate } from '@reach/router'

/** A11Y
 *
 * The autocomplete needs work
 */

const SearchResultsAutocomplete = styled('div')`
  position: absolute;
  background: ${colors.white};
  border: 1px solid ${colors.black};
  text-align: left;
  z-index: 1000;
  a {
    display: block;
    color: ${colors.black};
    text-decoration: none;
    padding: 0.5rem;
    :focus,
    :hover {
      background: ${colors.primary.darkest};
      color: ${colors.white};
      span {
        color: ${colors.white};
      }
    }
  }
`

const SearchAutocompleteItemTitle = styled('span')`
  font-weight: bold;
  font-size: 80%;
`

const SearchAutocompleteItemSite = styled('span')`
  font-size: 60%;
  color: ${colors.muted.dark};
  display: block;
`

class Search extends React.Component {
  state = {
    search: false,
    query: false,
    selected: 0,
  }

  handleSubmit(event) {
    event.preventDefault()
    navigate(`/search?q=${this.state.query}`)
    this.setState({
      query: false,
    })
  }

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

  handleKeyDown(event) {
    if (event.key === 'Escape') {
      this.setState({ search: false })
    }
  }

  handleAutocompleteKeyDown(event) {
    if (event.key === 'Escape') {
      this.setState({ search: false })
    }
  }

  render() {
    const { search } = this.state
    return (
      <Rect>
        {({ rect, ref }) => (
          <form
            method="GET"
            action="/search"
            onSubmit={this.handleSubmit.bind(this)}
            className={css`
              display: inline-block;
              margin-bottom: 0;
            `}
          >
            <InputText
              label="Search"
              name="q"
              forwardedRef={ref}
              autoComplete="off"
              hideLabel={true}
              placeholder="Search"
              onChange={this.handleChange.bind(this)}
              onKeyDown={this.handleKeyDown.bind(this)}
              inline
            />
            <Portal>
              {search ? (
                <SearchResultsAutocomplete
                  onKeyDown={this.handleAutocompleteKeyDown.bind(this)}
                  forwardedRef={node => {
                    this.autocompleteRef = node
                  }}
                  style={{
                    top: rect.top + rect.height,
                    left: rect.left,
                    width: rect.width,
                  }}
                >
                  {search.records.page.map(item => (
                    <div key={item.id}>
                      <Link to={item.url.replace('https://csumb.edu', '')}>
                        <SearchAutocompleteItemTitle>
                          {item.title}
                        </SearchAutocompleteItemTitle>
                        <SearchAutocompleteItemSite>
                          {item.site_name}
                        </SearchAutocompleteItemSite>
                      </Link>
                    </div>
                  ))}
                </SearchResultsAutocomplete>
              ) : null}
            </Portal>
            <VisuallyHidden>
              <input type="submit" value="Search" />
            </VisuallyHidden>
          </form>
        )}
      </Rect>
    )
  }
}

export default Search
