import React from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import Link from 'gatsby-link'
import slugify from 'slugify'
import { colors } from 'style/theme'

const EducationAbroadCountryWrapper = styled('div')`
  margin-bottom: 1rem;
`

const CollapsibleIcon = styled(FontAwesomeIcon)`
  margin-right: 0.8rem;
  font-size: 1rem;
`

const EducationAbroadCountryButton = styled('button')`
  padding: 0 0 0.3rem 0;
  cursor: pointer;
  border: 0;
  background: transparent;
  width: 100%;
  border-bottom: 1px solid ${colors.primary.darkest};
  text-align: left;
`

class EducationAbroadCountry extends React.Component {
  state = {
    isOpen: false,
  }

  render() {
    const { isOpen } = this.state
    const { country, programs } = this.props
    return (
      <EducationAbroadCountryWrapper>
        <h3>
          <EducationAbroadCountryButton
            onClick={event => {
              event.preventDefault()
              this.setState({
                isOpen: !isOpen,
              })
            }}
          >
            <CollapsibleIcon
              size="1x"
              icon={isOpen ? faChevronDown : faChevronRight}
            />
            {country}
          </EducationAbroadCountryButton>
        </h3>
        {isOpen && (
          <ul>
            {programs.map(program => (
              <li key={program.recordId}>
                <Link
                  to={`/educationabroad/program/${slugify(
                    program.recordId.replace('rec', '')
                  )}`}
                >
                  {program.data.Name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </EducationAbroadCountryWrapper>
    )
  }
}

const EducationAbroadProgramList = ({ programs }) => {
  const countryPrograms = {}
  const countryNames = []
  programs.forEach(({ node }) => {
    const countryName = node.data.Countries[0].data.Name
    if (typeof countryPrograms[countryName] === 'undefined') {
      countryPrograms[countryName] = []
      countryNames.push(countryName)
    }
    countryPrograms[countryName].push(node)
  })
  countryNames.sort()
  return (
    <>
      {countryNames.map(country => (
        <EducationAbroadCountry
          country={country}
          programs={countryPrograms[country]}
        />
      ))}
    </>
  )
}

export { EducationAbroadProgramList }
