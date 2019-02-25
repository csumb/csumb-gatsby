import React from 'react'
import Link from 'gatsby-link'
import VisuallyHidden from 'components/visually-hidden'
import Rect from '@reach/rect'
import { InputText } from 'components/forms'
import styled from '@emotion/styled'
import Portal from 'components/portal'
import { colors } from 'style/theme'
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
    line-height: normal;
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

const SearchForm = styled('form')`
  ${props => (props.inline ? `display: inline-block;` : `display: block;`)}
  margin-bottom: 0;
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
    const { isMobile } = this.props
    return (
      <Rect>
        {({ rect, ref }) => (
          <SearchForm
            method="GET"
            action="/search"
            onSubmit={this.handleSubmit.bind(this)}
            inline={!this.props.fullWidth}
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
              inline={!this.props.fullWidth}
              noMargin={!isMobile}
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
          </SearchForm>
        )}
      </Rect>
    )
  }
}

export default Search
