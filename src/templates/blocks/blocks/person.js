import React from 'react'
import { ContainerElement } from '../container-context'
import styled from 'react-emotion'
import { Flex, Box } from '@rebass/grid/emotion'
import { colors } from 'components/styles/theme'
import Link from 'gatsby-link'

const Person = styled('div')`
  margin: 0.5rem 0;
  padding: 0.5rem;
  background: ${colors.muted.light};
`

const PersonPosition = styled('p')``

const PersonPositionTitle = styled('span')`
  display: block;
  font-weight: bold;
`

const PersonPhoto = styled('img')`
  width: 100%;
`

class BlockPerson extends React.Component {
  render() {
    const { email, compact } = this.props
    return <p>PERSON</p>
    /*return (
      <ContainerElement isFull>
        <PeopleContext.Consumer>
          {people => (
            <>
              {people[email] && (
                <Person>
                  {compact ? (
                    <p>
                      {people[email].firstName} {people[email].lastName}
                    </p>
                  ) : (
                    <Flex flexWrap="wrap">
                      <Box width={[1, 3 / 4]} pr={2}>
                        <h3>
                          <Link
                            to={`/directory/person/${email.split('@').shift()}`}
                          >
                            {people[email].firstName} {people[email].lastName}
                          </Link>
                        </h3>
                        {people[email].directoryTitle.map((title, key) => (
                          <PersonPosition>
                            <PersonPositionTitle>{title}</PersonPositionTitle>
                            <Link>
                              {people[email].directoryDepartment[key]}
                            </Link>
                          </PersonPosition>
                        ))}
                        <a href={`mailto:${people[email].email}`}>
                          {people[email].email}
                        </a>
                      </Box>
                      <Box width={[1, 1 / 4]}>
                        {people[email].directoryPhoto && (
                          <PersonPhoto
                            src={people[email].directoryPhoto}
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
        </PeopleContext.Consumer>
      </ContainerElement>
    )*/
  }
}

export default BlockPerson
