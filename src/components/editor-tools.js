import React from 'react'
import { UserContext } from 'components/contexts/user'
import Cookies from 'universal-cookie'
import { colors } from 'style/theme'
import styled from '@emotion/styled'

const EditButtonLink = styled('a')`
  float: right;
  margin: 0 0 0.5rem 0.5rem;
  color: ${colors.white};
  background: ${colors.primary.dark};
  display: inline-block;
  padding: 0.5rem;
  text-decoration: none;
  &:visited {
    color: ${colors.white};
  }
`

const cookies = new Cookies()

const PageEditorTools = props => (
  <UserContext.Consumer>
    {context => (
      <>
        {context.user !== false && !context.user.anonymous && (
          <PageEditorUserTools user={context.user} {...props} />
        )}
      </>
    )}
  </UserContext.Consumer>
)

class PageEditorUserTools extends React.Component {
  state = {
    sites: [],
    isReady: false,
  }

  componentDidMount() {
    const { user } = this.props
    if (cookies.get('csumb-sites')) {
      this.setState({
        sites: cookies.get('csumb-sites'),
        isReady: true,
      })
      return
    }
    fetch(
      `https://csumb.edu/api/sites?name=${user.profile.login
        .split('@')
        .shift()}`
    )
      .then(response => {
        return response.json()
      })
      .then(sites => {
        cookies.set('csumb-sites', sites, { path: '/' })
        this.setState({
          isReady: true,
          sites: sites,
        })
      })
  }

  render() {
    const { sites, isReady } = this.state
    const { site, pageId } = this.props
    if (!isReady || typeof sites[site.site] === 'undefined') {
      return null
    }
    return (
      <EditButtonLink
        target="_blank"
        href={`https://edit.csumb.edu/node/${pageId}/edit`}
      >
        Edit page
      </EditButtonLink>
    )
  }
}

export default PageEditorTools
