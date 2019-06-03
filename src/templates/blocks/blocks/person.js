import React from 'react'
import styled from '@emotion/styled'
import { Flex, Box } from 'components/common/grid'
import Link from 'gatsby-link'
import LinkInspect from 'components/utilities/link-inspect'
import PagePersonContext from '../person-context'

const Person = styled('div')`
  margin: 0.5rem 0;
  padding: 0.5rem;
`

const PersonPosition = styled('p')``

const PersonPositionTitle = styled('span')`
  display: block;
  font-weight: bold;
`

const PersonPhoto = styled('img')`
  width: 100%;
`

const BlockPerson = ({ email, compact }) => (
  <PagePersonContext.Consumer>
    {context => (
      <>
        {context[email] && (
          <Person id={`profile-${email}`}>
            {compact ? (
              <Flex>
                <Box width={[1, 1 / 3]} pr={[0, 2]}>
                  <strong>
                    <Link to={`/directory/person/${email.split('@').shift()}`}>
                      {context[email].firstName} {context[email].lastName}
                    </Link>
                  </strong>
                </Box>
                <Box width={[1, 1 / 3]} pr={[0, 2]}>
                  {context[email].directoryTitle.map((title, key) => (
                    <PersonPosition>
                      <PersonPositionTitle>{title}</PersonPositionTitle>
                      {context[email].fullDepartments &&
                      context[email].fullDepartments[key] ? (
                        <>
                          {context[email].fullDepartments[key].website ? (
                            <LinkInspect
                              to={context[email].fullDepartments[key].website}
                            >
                              {context[email].fullDepartments[key].name}
                            </LinkInspect>
                          ) : (
                            <>{context[email].fullDepartments[key].name}</>
                          )}
                        </>
                      ) : (
                        <>{context[email].directoryDepartment[key]}</>
                      )}
                    </PersonPosition>
                  ))}
                </Box>

                <Box width={[1, 1 / 3]}>
                  <a href={`mailto:${context[email].email}`}>
                    {context[email].email}
                  </a>
                  {context[email]._publicProfile &&
                    context[email]._publicProfile.phone && (
                      <p>{context[email]._publicProfile.phone}</p>
                    )}
                </Box>
              </Flex>
            ) : (
              <Flex>
                <Box width={[1, 3 / 4]} pr={2}>
                  <h3>
                    <Link
                      to={`/directory/person/${context[email].email
                        .split('@')
                        .shift()}`}
                    >
                      {context[email].firstName} {context[email].lastName}
                    </Link>
                  </h3>
                  {context[email].directoryTitle.map((title, key) => (
                    <PersonPosition>
                      <PersonPositionTitle>{title}</PersonPositionTitle>
                      {context[email].fullDepartments &&
                      context[email].fullDepartments[key] ? (
                        <>
                          {context[email].fullDepartments[key].website ? (
                            <LinkInspect
                              to={context[email].fullDepartments[key].website}
                            >
                              {context[email].fullDepartments[key].name}
                            </LinkInspect>
                          ) : (
                            <>{context[email].fullDepartments[key].name}</>
                          )}
                        </>
                      ) : (
                        <>{context[email].directoryDepartment[key]}</>
                      )}
                    </PersonPosition>
                  ))}
                  <a href={`mailto:${context[email].email}`}>
                    {context[email].email}
                  </a>
                  {context[email]._publicProfile &&
                    context[email]._publicProfile.phone && (
                      <p>{context[email]._publicProfile.phone}</p>
                    )}
                  {context[email]._publicProfile &&
                    context[email].building &&
                    context[email]._publicProfile.buildingCode && (
                      <p>
                        <Link
                          to={`/directory/building/${
                            context[email]._publicProfile.buildingCode
                          }`}
                        >
                          {context[email].building}
                        </Link>
                        <br />
                        {context[email]._publicProfile.location
                          .split('-')
                          .pop()}
                      </p>
                    )}
                </Box>
                <Box width={[1, 1 / 4]}>
                  {context[email]._publicProfile &&
                    context[email]._publicProfile.photo && (
                      <PersonPhoto
                        src={context[email]._publicProfile.photo.replace(
                          '/csumb.edu/',
                          '/edit.csumb.edu/'
                        )}
                        alt=""
                      />
                    )}
                </Box>
              </Flex>
            )}
          </Person>
        )}
      </>
    )}
  </PagePersonContext.Consumer>
)

export default BlockPerson
