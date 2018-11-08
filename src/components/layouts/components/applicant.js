import React from 'react'
import styled from 'react-emotion'
import theme from 'components/styles/theme'
import User from 'components/user'
import Link from 'gatsby-link'

const ApplicantLink = styled(Link)`
  color: ${theme.colors.primary.darkest};
  margin-right: 1rem;
  text-decoration: none;
`

class Applicant extends React.Component {
  render() {
    return (
      <>
        <User>
          {user => (
            <>
              {user === false ? (
                <></>
              ) : (
                <>
                  {user === 'anonymous' ? (
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
        </User>
      </>
    )
  }
}

export default Applicant
