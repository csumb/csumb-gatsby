import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/layouts/sections/header/site-header'
import Container from 'components/container'
import PageTitle from 'components/layouts/sections/header/page-title'
import { Flex, Box } from '@rebass/grid/emotion'
import styled from '@emotion/styled'
import phoneFormatter from 'phone-formatter'
import showdown from 'showdown'
import Link from 'gatsby-link'
import sanitizeHtml from 'sanitize-html'
import { DirectoryNavigation } from 'components/pages/directory'

const DirectoryTitle = styled('div')`
  font-size: 1.5rem;
  font-weight: 700;
`

const DirectoryPosition = styled('div')`
  margin-bottom: 1.5rem;
`

const DirectoryItem = styled('p')`
  margin-bottom: 0.5rem;
`

const PersonTemplate = ({ pageContext }) => {
  const { user, building } = pageContext
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
  const room =
    _publicProfile && _publicProfile.location
      ? _publicProfile.location.split('-').pop()
      : false
  return (
    <Layout pageTitle={`${user.firstName} ${user.lastName} Directory`}>
      <SiteHeader path="/directory">Directory</SiteHeader>
      <DirectoryNavigation />
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
            <DirectoryItem>
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </DirectoryItem>
            {_publicProfile && _publicProfile.phone && (
              <DirectoryItem>
                {phoneFormatter.format(_publicProfile.phone, '(NNN) NNN-NNNN')}
              </DirectoryItem>
            )}
            {building && (
              <DirectoryItem>
                <Link to={`/directory/building/${_publicProfile.buildingCode}`}>
                  {building}
                </Link>
                {room && (
                  <>
                    <br />
                    {room}
                  </>
                )}
              </DirectoryItem>
            )}
            {_publicProfile && _publicProfile.officeHours && (
              <DirectoryItem>
                <h2>Office hours</h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: _publicProfile.officeHours.replace('\n', '<br/>'),
                  }}
                />
              </DirectoryItem>
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
          <>
            <h4>Biography</h4>
            <div
              dangerouslySetInnerHTML={{
                __html: converter.makeHtml(biography),
              }}
            />
          </>
        )}
      </Container>
    </Layout>
  )
}

export default PersonTemplate
