import React, { useState, useEffect } from 'react'
import Link from 'gatsby-link'

const BlockGe = ({ type, code }) => {
  const [courses, setCourses] = useState(false)

  useEffect(
    () => {
      fetch(`/catalog/json/${type.toLowerCase()}/${code.toLowerCase()}.json`)
        .then(response => {
          return response.json()
        })
        .then(courses => {
          setCourses(courses)
        })
    },
    [type, code]
  )

  if (!courses) {
    return null
  }
  return (
    <ul>
      {courses.map(course => (
        <li>
          <Link
            to={`/course/${course.SUBJECT.toLowerCase()}/${course.CATALOG_NBR.trim().toLowerCase()}`}
          >
            {course.SUBJECT} {course.CATALOG_NBR}: {course.COURSE_TITLE_LONG}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default BlockGe
