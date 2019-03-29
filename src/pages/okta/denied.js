import React from 'react'
import PlainLayout from 'components/layouts/plain'
import PageTitle from 'components/header/page-title'
import { LeadParagraph } from 'components/type'
import Brand from 'components/header/brand'
import styled from '@emotion/styled'

const OktaDeniedContainer = styled('div')`
  max-width: 60ch;
  margin: 3rem auto;
`

const ErrorPage = () => (
  <PlainLayout>
    <OktaDeniedContainer>
      <Brand style={{ maxWidth: '350px' }} />
      <PageTitle>You do not have access to that application</PageTitle>

      <LeadParagraph>
        The application you were trying to access is not assigned to your
        account. If you feel this is an error, please contact the IT Help Desk
        at (831) 582-HELP.
      </LeadParagraph>
    </OktaDeniedContainer>
  </PlainLayout>
)

export default ErrorPage
