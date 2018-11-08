import React from 'react'
import styled from 'react-emotion'
import theme from 'components/styles/theme'
import { UserContext } from 'components/contexts/user'
import Link from 'gatsby-link'

const ApplicantLink = styled(Link)`
  color: ${theme.colors.primary.darkest} !important;
  margin-right: 1rem;
  text-decoration: none;
`

class Applicant extends React.Component {
  render() {
    return (
      <>
        <UserContext.Consumer>
          {context => (
            <>
              {context.user === false ? (
                <></>
              ) : (
                <>
                  {context.user === 'anonymous' ? (
                    <></>
                  ) : (
                    <ApplicantLink to="/account/applicant-status">
                      Your application status
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
