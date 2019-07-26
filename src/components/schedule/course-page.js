import React from 'react'
import styled from '@emotion/styled'
import Link from 'gatsby-link'
import { Flex, Box } from '../common/grid'
import { Submit } from '../common/forms'
import { UnstyledList } from '../common/type'
import PageTitle from '../layouts/sections/header/page-title'
import Well from '../common/well'
import MeetingItem from './meeting-item'

const CourseSectionElement = styled.div``

const CourseSectionLegend = styled.h3`
  font-size: 1.3rem;
`

const CourseSection = ({ legend, children }) => (
  <CourseSectionElement>
    <CourseSectionLegend>{legend}</CourseSectionLegend>
    {children}
  </CourseSectionElement>
)

const CourseMeetingList = styled.ul`
  list-style-type: none;
  margin-left: 0;
`

const EnrollmentList = styled.dl`
  dt,
  dd {
    display: inline-block;
    width: 50%;
    margin-bottom: 0.3rem;
  }
`

const CourseTitle = styled.h2`
  margin-top: 0;
`

const CourseNumber = styled.pre`
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
      <CourseTitle>
        {course.TITLE}
        {course.CRSE_TOPIC_TITLE && (
          <>
            {': '}
            {course.CRSE_TOPIC_TITLE}
          </>
        )}
      </CourseTitle>
      <Flex>
        <Box width={[1, 1, 1 / 2, 1 / 2]} pr={[0, 2]}>
          <CourseSection legend="Days, times, and locations">
            <CourseMeetingList>
              {course._meetingPattern.map((meeting, key) => (
                <MeetingItem
                  key={key}
                  {...meeting}
                  showLocation
                  showSeparateDates
                />
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
          {course.NOTES && (
            <Well>
              <strong>Note:</strong> {course.NOTES}
            </Well>
          )}
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
              action="https://www.bkstr.com/webApp/discoverView"
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

export default CoursePage
