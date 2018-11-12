import React from 'react'
import styled from 'react-emotion'
import { colors } from 'components/styles/theme'
import { UserContext } from 'components/contexts/user'
import Link from 'gatsby-link'

const ApplicantLink = styled(Link)`
  color: ${colors.primary.darkest} !important;
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
