import React from 'react'
import styled from '@emotion/styled'
import Link from 'gatsby-link'
import { Flex, Box } from '@rebass/grid/emotion'
import { colors } from 'style/theme'
import { InputCheckbox, Submit } from 'components/forms'
import { UnstyledList } from 'components/type'
import { LinkyButton } from 'components/button'
import PageTitle from 'components/header/page-title'
import moment from 'moment'
import bp from 'style/breakpoints'
import Well from 'components/well'

const weekDays = [
  {
    short: 'MON',
    day: 'Monday',
  },
  {
    short: 'TUES',
    day: 'Tuesday',
  },
  {
    short: 'WED',
    day: 'Wednesday',
  },
  {
    short: 'THURS',
    day: 'Thursday',
  },
  {
    short: 'FRI',
    day: 'Friday',
  },
  {
    short: 'SAT',
    day: 'Saturday',
  },
  {
    short: 'SUN',
    day: 'Sunday',
  },
]

const ScheduleList = styled('ul')`
  list-style-type: none;
  margin: 0;
`

const ScheduleListItemElement = styled('li')`
  margin-bottom: 0.5rem;
  a {
    font-weight: bold;
    display: inline-block;
    margin-right: 0.5rem;
  }
`

const ScheduleListAlert = styled('span')`
  display: inline-block;
  padding: 0.25rem;
  font-weight: bold;
  font-size: 0.8rem;
  margin-right: 0.5rem;
`

const ScheduleListNotifier = ({ course }) => {
  return (
    <>
      {course.ENRL_TOT >= course.ENRL_MAX && (
        <ScheduleListAlert>Class full</ScheduleListAlert>
      )}
      {course.FEES && parseInt(course.FEES) > 0 && (
        <ScheduleListAlert>Additional fees</ScheduleListAlert>
      )}
      {typeof course._attributes !== 'undefined' &&
        typeof course._attributes.ZCCM !== 'undefined' && (
          <ScheduleListAlert>Free course materials</ScheduleListAlert>
        )}
      {course.CONSENT !== 'N' && (
        <ScheduleListAlert>Permission required</ScheduleListAlert>
      )}
    </>
  )
}

//<span class="label label-warning"><?php print $course['_sessions']['name']; ?></span>

const ScheduleListItem = ({ to, children, subject }) => (
  <ScheduleListItemElement>
    <Link to={to}>{subject}</Link>
    {children}
  </ScheduleListItemElement>
)

const GEList = ({ term, type, ge }) => {
  const showList = []
  ge.forEach(({ node }) => {
    if (node.type === type) {
      showList.push(node)
    }
  })
  return (
    <GEListElement>
      {showList.map(ge => (
        <GEListItem
          key={ge.code}
          to={`/schedule/${term.DESCR.toLowerCase().replace(
            ' ',
            ''
          )}/ge/${ge.code.toLowerCase()}`}
        >
          {ge.name}
        </GEListItem>
      ))}
    </GEListElement>
  )
}

const GEListElement = styled('ul')`
  list-style-type: none;
  margin: 0 0 2rem 0;
`

const GEListItemElement = styled('li')`
  margin-bottom: 0.5rem;
`

const GEListItem = ({ to, children }) => (
  <GEListItemElement>
    <Link to={to}>{children}</Link>
  </GEListItemElement>
)

const CourseListSearchCount = styled('div')`
  padding-bottom: 0.7rem;
  padding-left: 8px;
  margin-bottom: 0.7rem;
  font-weight: bold;
  border-bottom: 1px solid ${colors.muted.bright};
`

const DayOfWeekFilter = styled('div')`
  label {
    margin-right: 1.5rem;
    margin-bottom: 0;
  }
  input {
    margin-right: 0.3rem;
  }
`

class CourseList extends React.Component {
  state = {
    filter: false,
    isExpanded: false,
    filteredCourses: [],
    search: {
      onlyOpen: false,
      days: {
        MON: false,
        TUES: false,
        WED: false,
        THURS: false,
        FRI: false,
        SAT: false,
        SUN: false,
      },
    },
  }

  handleToggleFilter(event) {
    event.preventDefault()
    this.setState({
      isExpanded: !this.state.isExpanded,
      filter: this.state.isExpanded ? false : this.state.filter,
    })
  }

  handleDayOfWeek(event) {
    const search = this.state.search
    search.days[event.target.dataset.day] = event.target.checked
    this.setState({
      search: search,
    })
  }

  render() {
    const { courses, term } = this.props
    const { isExpanded, filter, search } = this.state
    let listCourses = filter ? [] : courses
    if (filter) {
      courses.forEach(course => {
        if (
          search.onlyOpen &&
          parseInt(course.ENRL_TOT) >= parseInt(course.ENRL_MAX)
        ) {
          return
        }
        let matchDays = false
        weekDays.forEach(day => {
          if (search.days[day.short]) {
            matchDays = true
          }
        })
        if (matchDays) {
          let daysMatch = false
          weekDays.forEach(day => {
            if (!search.days[day.short]) {
              return
            }
            course._meetingPattern.forEach(pattern => {
              if (pattern[day.short] === 'Y') {
                daysMatch = true
              }
            })
          })
          if (!daysMatch) {
            return
          }
        }
        listCourses.push(course)
      })
    }

    listCourses.sort((a, b) => {
      if (a.SUBJECT !== b.SUBJECT) {
        return a.SUBJECT.localeCompare(b.SUBJECT)
      }
      if (
        parseInt(a.CATALOG_NBR) === parseInt(b.CATALOG_NBR) &&
        a.SECTION > b.SECTION
      ) {
        return 1
      }
      if (
        parseInt(a.CATALOG_NBR) === parseInt(b.CATALOG_NBR) &&
        a.SECTION < b.SECTION
      ) {
        return -1
      }
      if (parseInt(a.CATALOG_NBR) > parseInt(b.CATALOG_NBR)) {
        return 1
      }
      if (a.SECTION > b.SECTION) {
        return 1
      }
      return -1
    })

    return (
      <section>
        <LinkyButton onClick={this.handleToggleFilter.bind(this)}>
          {isExpanded ? <>Hide filter</> : <>Filter courses</>}
        </LinkyButton>
        {isExpanded && (
          <Well>
            <form
              onSubmit={event => {
                event.preventDefault()
                this.setState({ filter: true })
              }}
            >
              <InputCheckbox
                name="isOpen"
                label="Show only open courses"
                onClick={event => {
                  const search = this.state.search
                  search.onlyOpen = event.target.checked
                  this.setState({
                    search: search,
                  })
                }}
              />
              <h4>Days of the week</h4>
              <DayOfWeekFilter>
                {weekDays.map(day => (
                  <InputCheckbox
                    key={day.day}
                    name={day.day}
                    data-day={day.short}
                    label={day.day}
                    inline={true}
                    onClick={this.handleDayOfWeek.bind(this)}
                  />
                ))}
              </DayOfWeekFilter>
              <p>
                <Submit value="Filter courses" />
              </p>
              <LinkyButton
                onClick={event => {
                  event.preventDefault()
                  this.setState({
                    filter: false,
                  })
                }}
              >
                Clear filter
              </LinkyButton>
            </form>
          </Well>
        )}
        <CourseListItemHeader />
        {filter && (
          <CourseListSearchCount>
            Found {listCourses.length} out of {courses.length} sections.
          </CourseListSearchCount>
        )}
        {listCourses.map((course, key) => (
          <CourseListItem key={key} course={course} term={term} />
        ))}
      </section>
    )
  }
}

const CourseListItemRow = styled('div')`
  margin-bottom: 0.7rem;
  padding-bottom: 0.7rem;
  border-bottom: 1px solid ${colors.muted.bright};
`

const MeetingList = styled('ul')`
  list-style-type: none;
  margin: 0;
  font-size: 80%;
`

const MeetingItem = props => {
  let meetingDays = []
  weekDays.forEach(day => {
    if (props[day.short] === 'Y') {
      meetingDays.push(day.day)
    }
  })

  const start = moment(props.MEETING_TIME_START)
  const end = moment(props.MEETING_TIME_END)
  return (
    <li>
      {parseInt(props.MEETING_BLDG) > 990 ? (
        <em>Arranged</em>
      ) : (
        <>
          {meetingDays.length && meetingDays.join(', ')} {start.format('h:mma')}{' '}
          to {end.format('h:mma')}
          {props.showLocation && props._building && (
            <>
              <br />
              <Link to={`/directory/building/${props._building.code}`}>
                {props._building.buildingName}
              </Link>{' '}
              - Room {props.MEETING_RM}
            </>
          )}
        </>
      )}
    </li>
  )
}

const CourseAttributeList = styled('ol')`
  list-style-type: none;
  font-size: 0.8rem;
  margin: 0;
  li {
    margin: 0;
  }
`

const CourseListItem = ({ course, term }) => {
  const link = `/schedule/${term.DESCR.toLowerCase().replace(' ', '')}/course/${
    course.CRN
  }`

  return (
    <CourseListItemRow>
      <Flex flexWrap="wrap">
        <Box width={[1, 1 / 12]} pr={[0, 2]}>
          <Link to={link}>
            {course.SUBJECT} {course.CATALOG_NBR}
          </Link>
        </Box>
        <Box width={[1, 3 / 12]} pr={[0, 2]}>
          <Link to={link}>{course.TITLE}</Link>
        </Box>
        <Box width={[1, 1 / 12]} pr={[0, 2]}>
          <CourseListMobileLabel>Section</CourseListMobileLabel>
          {parseInt(course.SECTION)}
        </Box>
        <Box width={[1, 1 / 12]} pr={[0, 2]}>
          <CourseListMobileLabel>Registration number</CourseListMobileLabel>
          {course.CRN}
        </Box>
        <Box width={[1, 1 / 12]} pr={[0, 2]}>
          <CourseListMobileLabel>Units</CourseListMobileLabel>
          {course.UNITS}
        </Box>
        <Box width={[1, 1 / 12]} pr={[0, 2]}>
          <CourseListMobileLabel>Enrollment</CourseListMobileLabel>
          {course.ENRL_TOT}/{course.ENRL_MAX}
        </Box>
        <Box width={[1, 3 / 12]} pr={[0, 2]}>
          {course._meetingPattern && (
            <>
              <CourseListMobileLabel>Days &amp; times</CourseListMobileLabel>
              <MeetingList>
                {course._meetingPattern.map((meeting, key) => (
                  <MeetingItem key={key} {...meeting} />
                ))}
              </MeetingList>
            </>
          )}
        </Box>
        <Box width={[1, 1 / 12]}>
          {(course._attributes.GE || course._attributes.UR) && (
            <CourseAttributeList>
              {course._attributes.GE && (
                <>
                  {course._attributes.GE.map(ge => (
                    <li>{ge}</li>
                  ))}
                </>
              )}
              {course._attributes.UR && (
                <>
                  {course._attributes.UR.map(ur => (
                    <li>{ur}</li>
                  ))}
                </>
              )}
            </CourseAttributeList>
          )}
        </Box>
      </Flex>
      <ScheduleListNotifier course={course} />
    </CourseListItemRow>
  )
}

const CourseListItemHeaderFlex = styled(Flex)`
  ${bp({
    display: ['none', 'flex'],
  })};
  background: ${colors.primary.darkest};
  color: ${colors.white};
  margin-bottom: 0.5rem;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
`

const CourseListItemHeaderBox = styled(Box)`
  padding: 0.5rem;
`

const CourseListMobileLabel = styled('strong')`
  ${bp({
    display: ['block', 'none'],
  })}
`

const CourseListItemHeader = () => (
  <CourseListItemHeaderFlex flexWrap="wrap">
    <CourseListItemHeaderBox width={[1, 1 / 12]} pr={[0, 2]}>
      Course
    </CourseListItemHeaderBox>
    <CourseListItemHeaderBox width={[1, 3 / 12]} pr={[0, 2]}>
      Title
    </CourseListItemHeaderBox>
    <CourseListItemHeaderBox width={[1, 1 / 12]} pr={[0, 2]}>
      Section
    </CourseListItemHeaderBox>
    <CourseListItemHeaderBox width={[1, 1 / 12]} pr={[0, 2]}>
      Number
    </CourseListItemHeaderBox>

    <CourseListItemHeaderBox width={[1, 1 / 12]} pr={[0, 2]}>
      Units
    </CourseListItemHeaderBox>
    <CourseListItemHeaderBox width={[1, 1 / 12]} pr={[0, 2]}>
      Seats
    </CourseListItemHeaderBox>
    <CourseListItemHeaderBox width={[1, 3 / 12]} pr={[0, 2]}>
      Day &amp; time
    </CourseListItemHeaderBox>

    <CourseListItemHeaderBox width={[1, 1 / 12]} pr={[0, 2]}>
      GE
    </CourseListItemHeaderBox>
  </CourseListItemHeaderFlex>
)

const CourseSectionElement = styled('div')``

const CourseSectionLegend = styled('h3')`
  font-size: 1.3rem;
`

const CourseSection = ({ legend, children }) => (
  <CourseSectionElement>
    <CourseSectionLegend>{legend}</CourseSectionLegend>
    {children}
  </CourseSectionElement>
)

const CourseMeetingList = styled('ul')`
  list-style-type: none;
  margin-left: 0;
`

const EnrollmentList = styled('dl')`
  dt,
  dd {
    display: inline-block;
    width: 50%;
    margin-bottom: 0.3rem;
  }
`

const CourseTitle = styled('h2')`
  margin-top: 0;
`

const CourseNumber = styled('pre')`
  font-size: 1.5rem;
`

const CoursePage = ({ course, term, requirements }) => {
  const codes = {}
  requirements.forEach(({ node }) => {
    codes[node.code] = node.name
  })
  return (
    <>
      <PageTitle
        sub={`${course.SUBJECT} ${course.CATALOG_NBR} Section ${
          course.SECTION
        }, ${course.UNITS} units`}
      >
        {term.DESCR}
      </PageTitle>
      <CourseTitle>{course.TITLE}</CourseTitle>
      <Flex flexWrap="wrap">
        <Box width={[1, 1, 1 / 2, 1 / 2]} pr={[0, 2]}>
          <CourseSection legend="Days, times, and locations">
            <CourseMeetingList>
              {course._meetingPattern.map((meeting, key) => (
                <MeetingItem key={key} {...meeting} showLocation />
              ))}
            </CourseMeetingList>
          </CourseSection>
          {course.FEES && parseInt(course.FEES) > 0 && (
            <CourseSection legend="Additional fees">
              <p>${course.FEES}</p>
            </CourseSection>
          )}
          <CourseSection legend="Enrollment">
            <EnrollmentList>
              <dt>Open seats</dt>
              <dd>{course.ENRL_MAX - course.ENRL_TOT}</dd>
              <dt>Total enrolled</dt>
              <dd>{course.ENRL_TOT}</dd>
              <dt>Maximum enrollment</dt>
              <dd>{course.ENRL_MAX}</dd>
            </EnrollmentList>
          </CourseSection>
          <CourseSection legend="How to register">
            {course.CONSENT === 'I' && (
              <p>
                To register, you need permission from the instructor.
                <Link to="/permission-codes">
                  Learn more about permission codes.
                </Link>
              </p>
            )}
            {course.CONSENT === 'D' && (
              <p>
                To register, you need permission from the department.{' '}
                <Link to="/permission-codes">
                  Learn more about permission codes.
                </Link>
              </p>
            )}
            <p>
              Use this number to{' '}
              <Link to="/registration-process">
                register for the course in OASIS
              </Link>
              :
            </p>
            <CourseNumber>{course.CRN}</CourseNumber>
          </CourseSection>
          {course._instructors && (
            <CourseSection
              legend={`Instructor${course._instructors.length > 1 ? `s` : ``}`}
            >
              <UnstyledList>
                {course._instructors.map(instructor => (
                  <li>
                    <Link
                      to={`/directory/person/${instructor.email
                        .split('@')
                        .shift()
                        .toLowerCase()}`}
                    >
                      {instructor.firstName} {instructor.lastName}
                    </Link>
                  </li>
                ))}
              </UnstyledList>
            </CourseSection>
          )}
        </Box>
        <Box width={[1, 1, 1 / 2, 1 / 2]} pr={[0, 2]}>
          <p>{course.DESCR}</p>
          <CourseSection legend="University requirements">
            {course._attributes.GE || course._attributes.UR ? (
              <ul>
                {course._attributes.GE && (
                  <>
                    {course._attributes.GE.map(ge => (
                      <li>{codes[ge]}</li>
                    ))}
                  </>
                )}
                {course._attributes.UR && (
                  <>
                    {course._attributes.UR.map(ur => (
                      <li>{codes[ur]}</li>
                    ))}
                  </>
                )}
              </ul>
            ) : (
              <p>
                This course does not fulfill any{' '}
                <Link to="/catalog/undergraduate-programs">
                  general university requirements
                </Link>
                .
              </p>
            )}
          </CourseSection>

          <CourseSection legend="Buy books">
            <p>Purchase books for this course from the CSUMB bookstore</p>
            <form
              method="post"
              target="_blank"
              action="http://www.bkstr.com/webapp/wcs/stores/servlet/booklookServlet"
            >
              <input type="hidden" name="bookstore_id-1" value="2029" />
              <input type="hidden" name="term_id-1" value={course.STRM} />
              <input type="hidden" name="div-1" value=" " />
              <input type="hidden" name="dept-1" value={course.SUBJECT} />
              <input type="hidden" name="course-1" value={course.CATALOG_NBR} />
              <input type="hidden" name="section-1" value={course.SECTION} />
              <Submit value="Find books" />
            </form>
          </CourseSection>
        </Box>
      </Flex>
    </>
  )
}

const ScheduleBackLinkElement = styled(Link)`
  margin-bottom: 1rem;
  display: inline-block;
`

const ScheduleBackLink = ({ term }) => (
  <ScheduleBackLinkElement
    to={`/schedule/${term.DESCR.toLowerCase().replace(' ', '')}`}
  >
    ← Return to {term.DESCR}
  </ScheduleBackLinkElement>
)

const ScheduleTerms = styled('ul')`
  list-style-type: none;
  margin: 0;
  li {
    display: inline-block;
    margin-right: 1rem;
  }
`

const ScheduleTermList = ({ terms, currentTerm }) => {
  if (typeof terms[currentTerm.TERM] !== 'undefined') {
    delete terms[currentTerm.TERM]
  }
  return (
    <ScheduleTerms>
      {Object.keys(terms).map(termCode => (
        <li key={termCode}>
          <Link
            to={`/schedule/${terms[termCode].DESCR.replace(
              ' ',
              ''
            ).toLowerCase()}`}
          >
            {terms[termCode].DESCR}
          </Link>
        </li>
      ))}
    </ScheduleTerms>
  )
}

export {
  ScheduleList,
  ScheduleListItem,
  ScheduleTermList,
  GEList,
  GEListItem,
  CourseList,
  CourseSection,
  MeetingItem,
  CoursePage,
  ScheduleBackLink,
}
