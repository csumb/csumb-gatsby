import React from 'react'
//import { css } from 'emotion'
import Link from 'gatsby-link'
import VisuallyHidden from '@reach/visually-hidden'
import { navigate } from '@reach/router'
import { css } from 'emotion'
import Portal from '../../portal'
import Rect from '@reach/rect'

/** A11Y
 *
 * The autocomplete doesn't∏
 */
class SearchResults extends React.Component {
  state = {
    selected: false,
  }

  render() {
    if (!this.props.search || !this.props.search.record_count) {
      return null
    }
    return (
      <div
        className={css`
          position: absolute;
          background: #fff;
          border: 1px solid #000;
        `}
        style={{
          top: this.props.rect.top + this.props.rect.height,
          left: this.props.rect.left,
          width: this.props.rect.width,
        }}
      >
        {this.props.search.records.page.map(item => (
          <div key={item.id}>
            <Link
              className={css`
                display: block;
                text-decoration: none;
                padding: 0.5rem;
                :focus,
                :hover {
                  background: blue;
                  color: #fff;
                }
              `}
              to={item.url.replace('https://csumb.edu', '')}
            >
              {item.title}
            </Link>
          </div>
        ))}
      </div>
    )
  }
}

class Search extends React.Component {
  inputRef = React.createRef()

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
            <input
              type="text"
              ref={ref}
              aria-label="Search"
              onChange={this.handleChange}
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
