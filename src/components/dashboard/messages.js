import React, { Component } from 'react'
import { AlertEmpty } from 'components/common/alert'
import VisuallyHidden from 'components/utilities/visually-hidden'
import Link from 'gatsby-link'

import DashboardAlumni from './alumni'

import {
  DashboardCard,
  DashboardMessageClose,
  DashboardCardHeader,
} from './shared-styles'

class DashboardMessages extends Component {
  render() {
    const { messages, archive } = this.props
    return (
      <>
        <DashboardAlumni />
        {messages && messages.length ? (
          <>
            {messages.map((message, key) => (
              <DashboardMessage
                key={key}
                message={message}
                user={this.props.user}
                archive={archive}
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
    const { archived } = this.state
    return (
      <>
        {!archived && (
          <DashboardCard>
            <DashboardMessageClose onClick={this.archiveMessage.bind(this)}>
              &times;
              <VisuallyHidden>Archive message</VisuallyHidden>
            </DashboardMessageClose>
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
