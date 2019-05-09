import React, { Component } from 'react'
import Container from 'components/common/container'
import { colors } from 'style/theme'
import styled from '@emotion/styled'
import { Flex, Box } from '@rebass/grid/emotion'
import VisuallyHidden from 'components/utilities/visually-hidden'
import Link from 'gatsby-link'
import { ButtonLink, Button } from 'components/common/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronUp,
  faChevronDown,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { DialogOverlay, DialogContent } from 'components/common/dialog'
import { CloseDialog } from './shared-styles'

const DashboardAppsWrapper = styled('div')`
  background: ${colors.primary.dark};
  padding: 0.5rem 0 0.4rem 0;
`

const DashboardApp = styled('a')`
  ${props =>
    props.isMobile
      ? `
    display: block;
    margin: 1rem 0;
    `
      : `
    color: ${colors.white};
  text-decoration: none;
  display: inline-block;
  margin-right: 0.8rem;
  margin-top: 0.5rem;
  padding: 0.2rem;
  &:hover {
    text-decoration: underline;
  }
  &:visited {
    color: ${colors.white};
  }
    `}
`

const appToolsStyle = `
  padding: 0.2rem;
  border: 1px solid ${colors.white};
  margin-top: 0.5rem;
  display: inline-block;
  background: transparent;
  color: ${colors.white};
  text-align: center;
  cursor: pointer;
  width: 100%;
  &:hover {
    background: ${colors.primary.darkest};
  }
  &:link,
  &:visited {
    color: ${colors.white};
  }
`

const EditOrderButton = styled('button')`
  ${appToolsStyle};
  text-decoration: none;
`

const MoreAppsButton = styled('button')`
  ${appToolsStyle};
`

const DasbhoardAppToggle = styled('button')`
  float: right;
  margin-left: 1rem;
  background: transparent;
  color: ${colors.white};
  border: none;
  cursor: pointer;
  font-size: 1.3rem;
`

const MoreAppsDialog = styled(DialogContent)`
  width: 75vw;
`

const MoreAppsList = styled('ul')`
  list-style-type: none;
  margin: 0;
  columns: 2;
  -webkit-columns: 2;
  -moz-columns: 2;
  li {
    padding-left: 0;
  }
`

const MoreAppsMessage = styled('p')`
  font-size: 0.8rem;
  text-align: right;
`

const DashboardOktaAppList = ({ apps, isMobile }) => (
  <>
    {apps.map((app, index) => (
      <DashboardApp
        href={app.linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        key={app.linkUrl}
        isMobile={isMobile}
      >
        {app.label}
      </DashboardApp>
    ))}
  </>
)

class DashboardEditOrderApps extends Component {
  state = {
    showDialog: false,
  }

  render() {
    return (
      <>
        <EditOrderButton
          onClick={event => {
            event.preventDefault()
            this.setState({ showDialog: true })
          }}
        >
          Edit order
          <VisuallyHidden> of apps</VisuallyHidden>
        </EditOrderButton>
        <DialogOverlay
          style={{ background: 'rgba(0, 0, 0, 0.7)' }}
          isOpen={this.state.showDialog}
        >
          <MoreAppsDialog>
            <CloseDialog onClick={() => this.setState({ showDialog: false })}>
              <VisuallyHidden>Close dialog</VisuallyHidden>
              <FontAwesomeIcon icon={faTimes} />
            </CloseDialog>
            <h2>Edit app order</h2>
            <p>
              Your dashboard apps are managed in <strong>Okta</strong>. Continue
              to your Okta Dashboard and drag to reorder your apps.
            </p>
            <ButtonLink to="https://csumb.okta.com/" target="_blank">
              Open Okta Dashboard
            </ButtonLink>
          </MoreAppsDialog>
        </DialogOverlay>
      </>
    )
  }
}

class DashboardOtherApps extends Component {
  state = {
    showDialog: false,
  }

  render() {
    const { apps } = this.props
    return (
      <>
        <MoreAppsButton onClick={() => this.setState({ showDialog: true })}>
          More apps
        </MoreAppsButton>
        <DialogOverlay
          style={{ background: 'rgba(0, 0, 0, 0.7)' }}
          isOpen={this.state.showDialog}
        >
          <MoreAppsDialog>
            <CloseDialog onClick={() => this.setState({ showDialog: false })}>
              <VisuallyHidden>Close dialog</VisuallyHidden>
              <FontAwesomeIcon icon={faTimes} />
            </CloseDialog>
            <h2>More apps</h2>
            <MoreAppsList>
              {apps.map(app => (
                <li key={app.node.name}>
                  <a
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={app.node.url}
                  >
                    {app.node.name}
                  </a>
                </li>
              ))}
            </MoreAppsList>
            <Button onClick={() => this.setState({ showDialog: false })}>
              Close
            </Button>
            <MoreAppsMessage>
              <Link to="/dashboard/new">Why are these apps here?</Link>
            </MoreAppsMessage>
          </MoreAppsDialog>
        </DialogOverlay>
      </>
    )
  }
}

const DashboardPlaceholderApp = styled('span')`
  display: inline-block;
  width: 80px;
  margin-right: 1rem;
`

const DashboardAppsPlaceholder = ({ mobile }) => {
  if (mobile) {
    return null
  }
  return (
    <DashboardAppsWrapper>
      <Container>
        <DashboardPlaceholderApp>&nbsp;</DashboardPlaceholderApp>
      </Container>
    </DashboardAppsWrapper>
  )
}

class DashboardApps extends Component {
  state = {
    oktaApps: false,
    isExpanded: false,
  }

  componentDidMount() {
    window
      .fetch('https://csumb.okta.com/api/v1/users/me/appLinks', {
        credentials: 'include',
      })
      .then(response => {
        return response.json()
      })
      .then(apps => {
        const oktaApps = {
          top: [],
          bottom: [],
        }
        apps.sort((a, b) => {
          return a.sortOrder - b.sortOrder
        })
        apps.forEach((app, index) => {
          if (app.label.search('CSUMB Website') === -1) {
            app.label = app.label.replace('Google Apps ', '')
            if (index < 9) {
              oktaApps.top.push(app)
            } else {
              oktaApps.bottom.push(app)
            }
          }
        })
        this.setState({
          oktaApps: oktaApps,
        })
      })
      .catch(error => {
        this.setState({
          oktaApps: false,
        })
      })
  }

  handleToggle(event) {
    event.preventDefault()
    this.setState({
      isExpanded: !this.state.isExpanded,
    })
  }

  render() {
    const { apps, isMobile } = this.props
    const { oktaApps, isExpanded } = this.state
    if (!oktaApps) {
      return <DashboardAppsPlaceholder mobile={isMobile} />
    }
    if (isMobile) {
      return (
        <Container topPadding>
          <DashboardOktaAppList apps={oktaApps.top} isMobile={true} />
          <DashboardOktaAppList apps={oktaApps.bottom} isMobile={true} />
        </Container>
      )
    }
    return (
      <DashboardAppsWrapper>
        <Container>
          <DasbhoardAppToggle onClick={this.handleToggle.bind(this)}>
            <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
            <VisuallyHidden>View more apps</VisuallyHidden>
          </DasbhoardAppToggle>
          <DashboardOktaAppList apps={oktaApps.top} />
        </Container>
        {isExpanded && (
          <Container>
            <Flex flexWrap="wrap">
              <Box width={[1, 10 / 12, 10 / 12]} pr={3}>
                <DashboardOktaAppList apps={oktaApps.bottom} />
              </Box>
              <Box width={[1, 2 / 12, 2 / 12]}>
                <DashboardEditOrderApps />
                <DashboardOtherApps apps={apps} />
              </Box>
            </Flex>
          </Container>
        )}
      </DashboardAppsWrapper>
    )
  }
}

export default DashboardApps
