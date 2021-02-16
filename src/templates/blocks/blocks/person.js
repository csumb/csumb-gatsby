import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { Flex, Box } from '../../../components/common/grid'
import Link from 'gatsby-link'
import LinkInspect from '../../../components/utilities/link-inspect'
import ContentLoader from 'react-content-loader'

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

const BlockPerson = ({ email, uuid, compact }) => {
  console.log(compact)
  const [person, setPerson] = useState(false)
  const [didLoad, setDidLoad] = useState(false)
  const [building, setBuilding] = useState(false)

  useEffect(
    () => {
      const link = email
        .split('@')
        .shift()
        .toLowerCase()
        .trim()
      fetch(`/page-data/directory/person/${link}/page-data.json`)
        .then(response => {
          return response.json()
        })
        .then(result => {
          setPerson(result.result.pageContext.user)
          setBuilding(
            result.result.pageContext.building
              ? result.result.pageContext.building
              : false
          )
          setDidLoad(true)
        })
        .catch(error => {
          setPerson(false)
          setDidLoad(true)
        })
    },
    [email]
  )

  return (
    <div>
      {!didLoad && (
        <ContentLoader
          height={160}
          width={400}
          speed={2}
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
          uniquekey={`person-loader-${uuid}`}
        >
          <rect x="10" y="5" rx="4" ry="4" width="266" height="20" />
          <rect x="10" y="38" rx="3" ry="3" width="245" height="14" />
          <rect x="10" y="61" rx="3" ry="3" width="245" height="14" />
          <rect x="10" y="84" rx="3" ry="3" width="245" height="14" />
          <rect x="288" y="5" rx="0" ry="0" width="105" height="106" />
        </ContentLoader>
      )}
      {person && (
        <Person
          className="content-type-person"
          id={`profile-${person.email.split('@').shift()}`}
        >
          {compact ? (
            <Flex>
              <Box width={[1, 1 / 3]} pr={[0, 2]}>
                <strong>
                  <Link
                    className="content-type-person--directory-link"
                    to={`/directory/person/${person.email.split('@').shift()}`}
                  >
                    {person.firstName} {person.lastName}
                  </Link>
                </strong>
              </Box>
              <Box width={[1, 1 / 3]} pr={[0, 2]}>
                {person.directoryTitle.map((title, key) => (
                  <PersonPosition>
                    <PersonPositionTitle className="content-type-person--position-title">
                      {title}
                    </PersonPositionTitle>
                    {person.fullDepartments && person.fullDepartments[key] ? (
                      <>
                        {person.fullDepartments[key].website ? (
                          <LinkInspect
                            className="content-type-person--department"
                            to={person.fullDepartments[key].website}
                          >
                            {person.fullDepartments[key].name}
                          </LinkInspect>
                        ) : (
                          <span className="content-type-person--department">
                            {person.fullDepartments[key].name}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="content-type-person--department">
                        {person.directoryDepartment[key]}
                      </span>
                    )}
                  </PersonPosition>
                ))}
              </Box>

              <Box width={[1, 1 / 3]}>
                <a
                  className="content-type-person--email"
                  href={`mailto:${person.email}`}
                >
                  {person.email}
                </a>
                {person._publicProfile && person._publicProfile.phone && (
                  <p className="content-type-person--phone">
                    {person._publicProfile.phone}
                  </p>
                )}
              </Box>
            </Flex>
          ) : (
            <Flex>
              <Box width={[1, 3 / 4]} pr={2}>
                <h3>
                  <Link
                    className="content-type-person--directory-link"
                    to={`/directory/person/${person.email.split('@').shift()}`}
                  >
                    {person.firstName} {person.lastName}
                  </Link>
                </h3>
                {person.directoryTitle.map((title, key) => (
                  <PersonPosition>
                    <PersonPositionTitle className="content-type-person--position-title">
                      {title}
                    </PersonPositionTitle>
                    {person.fullDepartments && person.fullDepartments[key] ? (
                      <>
                        {person.fullDepartments[key].website ? (
                          <LinkInspect
                            className="content-type-person--department"
                            to={person.fullDepartments[key].website}
                          >
                            {person.fullDepartments[key].name}
                          </LinkInspect>
                        ) : (
                          <span className="content-type-person--department">
                            {person.fullDepartments[key].name}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="content-type-person--department">
                        {person.directoryDepartment[key]}
                      </span>
                    )}
                  </PersonPosition>
                ))}
                <a
                  className="content-type-person--email"
                  href={`mailto:${person.email}`}
                >
                  {person.email}
                </a>
                {person._publicProfile && person._publicProfile.phone && (
                  <p className="content-type-person--phone">
                    {person._publicProfile.phone}
                  </p>
                )}
                {person._publicProfile && person._publicProfile.buildingCode && (
                  <p>
                    <Link
                      className="content-type-person--building"
                      to={`/directory/building/${
                        person._publicProfile.buildingCode
                      }`}
                    >
                      {building}
                    </Link>
                    <br />
                    <span className="content-type-person--location">
                      {person._publicProfile.location.split('-').pop()}
                    </span>
                  </p>
                )}
                {person._publicProfile && person._publicProfile.officeHours && (
                  <p
                    className="content-type-person--office-hours"
                    dangerouslySetInnerHTML={{
                      __html: person._publicProfile.officeHours.replace(
                        '\n',
                        '<br/>'
                      ),
                    }}
                  />
                )}
              </Box>
              <Box width={[1, 1 / 4]}>
                {person._publicProfile && person._publicProfile.photo && (
                  <PersonPhoto
                    className="content-type-person--photo"
                    src={person._publicProfile.photo
                      .replace('/csumb.edu/', '/edit.csumb.edu/')
                      .replace('http://', 'https://')}
                    alt=""
                  />
                )}
              </Box>
            </Flex>
          )}
        </Person>
      )}
    </div>
  )
}

export default BlockPerson
