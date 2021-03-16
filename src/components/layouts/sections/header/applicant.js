import React, { Component } from 'react'
import styled from '@emotion/styled'
import { colors } from '../../../../style'
import { UserContext } from '../../../contexts/user'

const ApplicantLink = styled('a')`
  color: ${colors.primary.darkest} !important;
  margin-right: 1rem;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`

class Applicant extends Component {
  render() {
    return (
      <>
        <UserContext.Consumer>
          {context => (
            <>
              {context.user === false ||
              context.user.anonymous ||
              !context.user._isApplicant ? (
                <></>
              ) : (
                <>
                  {context.user.anonymous ? (
                    <></>
                  ) : (
                    <ApplicantLink href="https://csumb.okta.com/home/csumb_applicantdashboard_1/0oaqxen8h1rSRu0dK0x7/alnqxeqj9dQGDKBXP0x7">
                      Your application
                    </ApplicantLink>
                  )}
                </>
              )}
            </>
          )}
        </UserContext.Consumer>
      </>
    )
  }
}

export default Applicant
