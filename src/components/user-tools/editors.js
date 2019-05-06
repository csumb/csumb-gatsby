import React, { Component } from 'react'
import { UserContext } from 'components/contexts/user'
import Cookies from 'universal-cookie'
import { colors } from 'style/theme'
import styled from '@emotion/styled'

const EditButtonLink = styled('a')`
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

const EditButtonWrapper = styled('div')`
  margin-bottom: 0.5rem;
  text-align: right;
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

class PageEditorUserTools extends Component {
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
    fetch(`https://edit.csumb.edu/api/sites?name=${user._username}`)
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
      <EditButtonWrapper>
        <EditButtonLink
          target="_blank"
          href={
            pageId
              ? `https://edit.csumb.edu/node/${pageId}/edit`
              : 'https://edit.csumb.edu'
          }
        >
          Edit page
        </EditButtonLink>
      </EditButtonWrapper>
    )
  }
}

export default PageEditorTools
