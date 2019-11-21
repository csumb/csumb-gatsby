import React from 'react'
import { Layout } from '../../components/layouts/default'
import SiteHeader from '../../components/layouts/sections/header/site-header'
import Container from '../../components/common/container'
import PageTitle from '../../components/layouts/sections/header/page-title'
import { Flex, Box } from '../../components/common/grid'
import styled from '@emotion/styled'
import phoneFormatter from 'phone-formatter'
import showdown from 'showdown'
import Link from 'gatsby-link'
import LinkInspect from '../../components/utilities/link-inspect'
import sanitizeHtml from 'sanitize-html'
import { DirectoryNavigation } from '../../components/pages/directory'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileDownload } from '@fortawesome/free-solid-svg-icons'

const DocumentIconWrapper = styled('span')`
  display: inline-block;
  max-width: 1rem;
  font-size: 1.2rem;
  margin-right: 0.8rem;
`

const DocumentIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
  max-width: 50px;
`

const Resume = styled('a')`
  display: block;
  font-weight: bold;
  margin: 1rem 0;
`

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
        <Flex>
          <Box width={[1, 1, 3 / 4]}>
            {user.directoryDepartment.map((department, key) => (
              <DirectoryPosition key={key}>
                <DirectoryTitle>{user.directoryTitle[key]}</DirectoryTitle>
                {user.fullDepartments && user.fullDepartments[key] ? (
                  <>
                    {user.fullDepartments[key].website ? (
                      <LinkInspect to={user.fullDepartments[key].website}>
                        {user.fullDepartments[key].name}
                      </LinkInspect>
                    ) : (
                      <>{user.fullDepartments[key].name}</>
                    )}
                  </>
                ) : (
                  <>{department}</>
                )}
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
              <>
                <h2>Building &amp; room</h2>
                <DirectoryItem>
                  <Link
                    to={`/directory/building/${_publicProfile.location
                      .split('-')
                      .shift()}`}
                  >
                    {building}
                  </Link>
                  {room && (
                    <>
                      <br />
                      {room}
                    </>
                  )}
                </DirectoryItem>
              </>
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
            {_publicProfile && _publicProfile.appointmentCalendar && (
              <DirectoryItem>
                <h2>Make appointment</h2>
                <a
                  href={_publicProfile.appointmentCalendar}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Make an appointment
                </a>
              </DirectoryItem>
            )}
          </Box>
          <Box width={[1, 1, 1 / 4]}>
            {_publicProfile && _publicProfile.photo && (
              <img
                src={_publicProfile.photo.replace(
                  '/csumb.edu/',
                  '/edit.csumb.edu/'
                )}
                alt=""
              />
            )}
          </Box>
        </Flex>
        {_publicProfile && _publicProfile.resume && (
          <Resume href={_publicProfile.resume}>
            <DocumentIconWrapper>
              <DocumentIcon icon={faFileDownload} />
            </DocumentIconWrapper>
            Download CV or resume
          </Resume>
        )}
        {biography && (
          <>
            <h2>Biography</h2>
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
