import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/header/site-header'
import Container from 'components/container'
import PageTitle from 'components/header/page-title'
import { Flex, Box } from '@rebass/grid/emotion'
import styled from '@emotion/styled'
import phoneFormatter from 'phone-formatter'
import showdown from 'showdown'
import sanitizeHtml from 'sanitize-html'

const DirectoryTitle = styled('div')`
  font-size: 1.5rem;
  font-weight: 700;
`

const DirectoryPosition = styled('div')`
  margin-bottom: 1.5rem;
`

const PersonTemplate = ({ pageContext }) => {
  const { user } = pageContext
  const { _publicProfile } = user
  const converter = new showdown.Converter()
  const biography =
    _publicProfile && _publicProfile.biography
      ? sanitizeHtml(_publicProfile.biography, {
          allowedTags: [
            'b',
            'i',
            'em',
            'h2',
            'h3',
            'ul',
            'ol',
            'li',
            'blockquote',
            'strong',
            'a',
          ],
        })
      : false
  return (
    <Layout pageTitle={`${user.firstName} ${user.lastName} Directory`}>
      <SiteHeader path="/directory">Directory</SiteHeader>
      <Container>
        <PageTitle>
          {user.firstName} {user.lastName}
        </PageTitle>
        <Flex flexWrap="wrap">
          <Box width={[1, 1, 3 / 4]}>
            {user.directoryDepartment.map((department, key) => (
              <DirectoryPosition key={key}>
                <DirectoryTitle>{user.directoryTitle[key]}</DirectoryTitle>
                {department}
              </DirectoryPosition>
            ))}
            <h2>Contact information</h2>
            <p>
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </p>
            {_publicProfile && _publicProfile.phone && (
              <p>
                {phoneFormatter.format(_publicProfile.phone, '(NNN) NNN-NNNN')}
              </p>
            )}
          </Box>
          <Box width={[1, 1, 1 / 4]}>
            {_publicProfile && _publicProfile.photo && (
              <img
                src={_publicProfile.photo.replace(
                  'csumb.edu',
                  'edit.csumb.edu'
                )}
                alt=""
              />
            )}
          </Box>
        </Flex>
        {biography && (
          <div
            dangerouslySetInnerHTML={{
              __html: converter.makeHtml(biography),
            }}
          />
        )}
      </Container>
    </Layout>
  )
}

export default PersonTemplate
