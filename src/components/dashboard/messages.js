import React, { Component } from 'react'
import { AlertEmpty } from '../common/alert'
import Link from 'gatsby-link'
import { DashboardCard, DashboardCardHeader } from './shared-styles'

class DashboardMessages extends Component {
  render() {
    const { messages, archive, archivedContent } = this.props
    return (
      <>
        {messages && messages.length ? (
          <>
            {messages.map((message, key) => (
              <DashboardMessage
                key={key}
                message={message}
                user={this.props.user}
                archive={archive}
                archivedContent={archivedContent}
              />
            ))}
          </>
        ) : (
          <AlertEmpty>You do not have any messages</AlertEmpty>
        )}
      </>
    )
  }
}

class DashboardMessage extends Component {
  state = {
    archived: false,
  }

  archiveMessage(event) {
    event.preventDefault()
    this.setState({
      archived: true,
    })
    this.props.archive(this.props.message.id)
  }

  render() {
    const { headline, message, link } = this.props.message
    const { archivedContent } = this.props
    const { archived } = this.state
    return (
      <>
        {!archived && (
          <DashboardCard>
            <Link to={link}>
              <DashboardCardHeader>{headline}</DashboardCardHeader>
            </Link>
            <p>{message}</p>
          </DashboardCard>
        )}
      </>
    )
  }
}

export { DashboardMessages, DashboardMessage }
