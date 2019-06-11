import React, { Component } from 'react'
import { Layout, PageTitle, SiteHeader, SiteNavigation } from 'components/layouts/default'
import Container from 'components/common/container'
import { Flex, Box } from 'components/common/grid'
import { UserContext } from 'components/contexts/user'
import { StaticQuery, graphql } from 'gatsby'
import Loading from 'components/common/loading'
import { InputText, Submit } from 'components/common/forms'
import logo from 'assets/images/csumb-logo-white.svg'
import styled from '@emotion/styled'
import { AlertSuccess } from 'components/common/alert'
import { colors } from 'style/theme'
import {
  AccountGroup,
  AccountTitle,
  AccountSidebar,
  AccountPlaceholder,
} from 'components/pages/account'
import { Button, LinkyButton } from 'components/common/button'

const NameBadgePreview = styled.div`
  background: ${colors.primary.darkest};
  padding: 1rem;
  min-height: 220px;
  text-align: center;
  margin-bottom: 1.5rem;
  color: ${colors.white};
  p {
    margin: 0;
  }
  img {
    width: 200px;
    margin: 0;
  }
  h3 {
    margin-bottom: 0.5rem;
  }
`

const AccountNameBadgePage = () => (
  <Layout pageTitle="Name badge">
    <UserContext.Consumer>
      {context => (
        <>
          {context.user ? (
            <Container>
              <PageTitle>
                {context.user.anonymous ? (
                  <h3>Your profile</h3>
                ) : (
                  <>
                    {context.user.profile.firstName}{' '}
                    {context.user.profile.lastName}
                  </>
                )}
              </PageTitle>
              <Flex>
                <Box width={[1, 1 / 4]} pr={[0, 4]}>
                  <AccountSidebar active="profile" user={context.user} />
                </Box>
                <Box width={[1, 3 / 4]}>
                  {context.user.anonymous ? (
                    <h3>You must be logged in first.</h3>
                  ) : (
                    <>
                      <AccountTitle>Order name badge</AccountTitle>

                      <NameBadge user={context.user} />
                    </>
                  )}
                </Box>
              </Flex>
            </Container>
          ) : (
            <AccountPlaceholder />
          )}
        </>
      )}
    </UserContext.Consumer>
  </Layout>
)

class NameBadge extends Component {
  state = {
    profile: false,
    notFound: false,
    selectedPosition: false,
  }
  componentDidMount() {
    const link = this.props.user.profile.email
      .split('@')
      .shift()
      .toLowerCase()
      .trim()
    fetch(`/page-data/directory/person/${link}/page-data.json`)
      .then(response => {
        return response.json()
      })
      .then(result => {
        if (!result) {
          this.setState({
            notFound: true,
          })
          return
        }
        this.setState({
          profile: result.result.pageContext.user,
        })
      })
      .catch(() => {
        this.setState({
          notFound: true,
        })
      })
  }

  render() {
    const { profile, notFound, selectedPosition } = this.state
    return (
      <>
        <AccountGroup legend="Order">
          {notFound ? (
            <p>We could not find your titles or positions.</p>
          ) : (
            <>
              {profile ? (
                <>
                  {selectedPosition ? (
                    <>
                      <LinkyButton
                        to="/account/name-badge"
                        onClick={event => {
                          event.preventDefault()
                          this.setState({ selectedPosition: false })
                        }}
                      >
                        Start over
                      </LinkyButton>
                      <NameBadgeForm
                        profile={profile}
                        position={selectedPosition}
                      />
                    </>
                  ) : (
                    <>
                      <h3>Select your position</h3>
                      {profile.directoryDepartment.map((department, key) => (
                        <Flex key={key}>
                          <Box width={2 / 12} pr={4}>
                            <Button
                              onClick={event => {
                                event.preventDefault()
                                this.setState({
                                  selectedPosition: {
                                    title: profile.directoryTitle[key],
                                    department: profile.fullDepartments[key]
                                      ? profile.fullDepartments[key].name
                                      : department,
                                  },
                                })
                              }}
                            >
                              Select
                            </Button>
                          </Box>
                          <Box width={10 / 12}>
                            <strong>{profile.directoryTitle[key]}</strong>
                            <br />
                            {profile.fullDepartments[key] ? (
                              <>{profile.fullDepartments[key].name}</>
                            ) : (
                              <>{department}</>
                            )}
                          </Box>
                        </Flex>
                      ))}
                    </>
                  )}
                </>
              ) : (
                <Loading>Loading positions</Loading>
              )}
            </>
          )}
        </AccountGroup>
      </>
    )
  }
}

class NameBadgeForm extends Component {
  state = {
    email: '',
    confirmed: false,
    style: false,
    showConfirmation: false,
  }

  handleSubmit(event) {
    event.preventDefault()
    const { profile, position } = this.props

    fetch(
      `/cloud-functions/name-badge?email=${profile.email}&firstName=${
        profile.firstName
      }&lastName=${profile.lastName}&title=${position.title}&department=${
        position.department
      }&design=${this.state.style}&procardemail=${this.state.email}`
    )
      .then(response => {
        return response.json()
      })
      .then(response => {
        this.setState({
          success: true,
        })
      })
      .catch(() => {
        this.setState({
          sucecss: true,
        })
      })
  }

  render() {
    const { position, profile } = this.props
    const { style, showConfirmation, success } = this.state
    return (
      <StaticQuery
        query={graphql`
          {
            allMarkdownRemark(
              filter: {
                frontmatter: {
                  name: {
                    in: ["name-badge-preamble", "name-badge-confirmation"]
                  }
                }
              }
            ) {
              edges {
                node {
                  frontmatter {
                    name
                  }
                  html
                }
              }
            }
          }
        `}
        render={data => (
          <>
            {success ? (
              <AlertSuccess>Your name badge has been ordered.</AlertSuccess>
            ) : (
              <form onSubmit={this.handleSubmit.bind(this)}>
                <h3>Select the style of name badge</h3>
                <Flex>
                  <Box width={1 / 3} pr={4}>
                    <h4>Title and department</h4>
                    <Button
                      onClick={event => {
                        event.preventDefault()
                        this.setState({
                          style: 'title-department',
                        })
                      }}
                    >
                      {style && style === 'title-department' ? (
                        <>Style Selected</>
                      ) : (
                        <>Select</>
                      )}
                    </Button>
                  </Box>
                  <Box width={2 / 3} pr={4}>
                    <NameBadgePreview>
                      <img src={logo} alt="" />
                      <h3>
                        {profile.firstName} {profile.lastName}
                      </h3>
                      <p>{position.title}</p>
                      <p>{position.department}</p>
                    </NameBadgePreview>
                  </Box>
                </Flex>
                <Flex>
                  <Box width={1 / 3} pr={4}>
                    <h4>Department only</h4>
                    <Button
                      onClick={event => {
                        event.preventDefault()
                        this.setState({
                          style: 'department',
                        })
                      }}
                    >
                      {style && style === 'department' ? (
                        <>Style Selected</>
                      ) : (
                        <>Select</>
                      )}
                    </Button>
                  </Box>
                  <Box width={2 / 3} pr={4}>
                    <NameBadgePreview>
                      <img src={logo} alt="" />
                      <h3>
                        {profile.firstName} {profile.lastName}
                      </h3>
                      <p>{position.department}</p>
                    </NameBadgePreview>
                  </Box>
                </Flex>
                {style && (
                  <>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data.allMarkdownRemark.edges[0].node.html,
                      }}
                    />
                    <InputText
                      name="name-badge-email"
                      label="Email of person with department procurement card"
                      onChange={event => {
                        this.setState({
                          email: event.target.value,
                        })
                      }}
                    />
                    {showConfirmation ? (
                      <>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: data.allMarkdownRemark.edges[1].node.html,
                          }}
                        />
                        <Submit value="Order name badge" />
                      </>
                    ) : (
                      <Button
                        onClick={event => {
                          event.preventDefault()
                          this.setState({
                            showConfirmation: true,
                          })
                        }}
                      >
                        Start to order
                      </Button>
                    )}
                  </>
                )}
              </form>
            )}
          </>
        )}
      />
    )
  }
}

export default AccountNameBadgePage
