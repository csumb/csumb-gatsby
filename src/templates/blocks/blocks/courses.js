import React, { useState, useEffect } from 'react'
import Well from '../../../components/common/well'
import Link from 'gatsby-link'

const BlockCourses = ({ subjectCode }) => {
  const [courses, setCourses] = useState(false)
  useEffect(
    () => {
      fetch(`/catalog/json/subject/${subjectCode.toLowerCase()}.json`)
        .then(response => {
          return response.json()
        })
        .then(courses => {
          setCourses(courses)
        })
    },
    [subjectCode]
  )

  if (!courses) {
    return null
  }
  return (
    <>
      {courses.map(course => (
        <Well key={`${course.SUBJECT}-${course.CATALOG_NBR}`}>
          <h3>
            <Link
              to={`/course/${course.SUBJECT.toLowerCase()}/${course.CATALOG_NBR.trim().toLowerCase()}`}
            >
              {course.SUBJECT} {course.CATALOG_NBR}: {course.COURSE_TITLE_LONG}
            </Link>
          </h3>
          <p>{course.DESCRLONG}</p>
        </Well>
      ))}
    </>
  )
}

export default BlockCourses
