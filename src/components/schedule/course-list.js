import React, { Component } from 'react'
import styled from '@emotion/styled'
import { colors, bp } from '../../style'
import { InputCheckbox, Submit } from '../common/forms'
import Well from '../common/well'
import { Flex, Box } from '../common/grid'
import Link from 'gatsby-link'
import { LinkyButton } from '../common/button'
import MeetingItem from './meeting-item'
import weekDays from './week-days'

const CourseListSearchCount = styled.div`
  padding-bottom: 0.7rem;
  padding-left: 8px;
  margin-bottom: 0.7rem;
  font-weight: bold;
  border-bottom: 1px solid ${colors.muted.bright};
`

const DayOfWeekFilter = styled.div`
  label {
    margin-right: 1.5rem;
    margin-bottom: 0;
  }
  input {
    margin-right: 0.3rem;
  }
`

const CourseListItemRow = styled.div`
  margin-bottom: 0.7rem;
  padding-bottom: 0.7rem;
  border-bottom: 1px solid ${colors.muted.bright};
`

const MeetingList = styled.ul`
  list-style-type: none;
  margin: 0;
  font-size: 80%;
`

const ScheduleListAlert = styled.span`
  display: inline-block;
  padding: 0.25rem;
  font-weight: bold;
  font-size: 0.8rem;
  margin-right: 0.5rem;
`

const CourseAttributeList = styled.ol`
  list-style-type: none;
  font-size: 0.8rem;
  margin: 0;
  li {
    margin: 0;
  }
`

const CourseListMobileLabel = styled.strong`
  ${bp({
    display: ['block', 'none'],
  })}
`

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

const CourseListItemHeader = () => (
  <CourseListItemHeaderFlex>
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

const ScheduleListNotifier = ({ course }) => {
  return (
    <>
      {parseInt(course.ENRL_TOT) >= parseInt(course.ENRL_MAX) && (
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

const CourseListItem = ({ course, term }) => {
  const link = `/schedule/${term.DESCR.toLowerCase().replace(' ', '')}/course/${
    course.CRN
  }`

  return (
    <CourseListItemRow>
      <Flex>
        <Box width={[1, 1 / 12]} pr={[0, 2]}>
          <Link to={link}>
            {course.SUBJECT} {course.CATALOG_NBR}
          </Link>
        </Box>
        <Box width={[1, 3 / 12]} pr={[0, 2]}>
          <Link to={link}>
            {course.TITLE}
            {course.CRSE_TOPIC_TITLE && (
              <>
                {': '}
                {course.CRSE_TOPIC_TITLE}
              </>
            )}
          </Link>
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

class CourseList extends Component {
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

export default CourseList
