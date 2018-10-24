import React from 'react'
import { css } from 'emotion'
import Link from 'gatsby-link'

const CourseListItem = props => (
  <div
    className={css`
      margin-bottom: 1rem;
    `}
  >
    <h3>
      <Link
        to={`/schedule/${props.term.DESCR.toLowerCase().replace(
          ' ',
          ''
        )}/course/${props.course.CRN}`}
      >
        {props.course.SUBJECT} {props.course.CATALOG_NBR}
      </Link>
    </h3>
    <p>{props.course.SECTION}</p>
  </div>
)

export default CourseListItem
