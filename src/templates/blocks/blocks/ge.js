import React from 'react'
import Link from 'gatsby-link'

class BlockGe extends React.Component {
  state = {
    courses: false,
  }
  componentDidMount() {
    const { type, code } = fetch(
      `/catalog/json/${type.toLowerCase()}/${code.toLowerCase()}.json`
    )
  }

  render() {
    const { courses } = this.state
    if (!courses) {
      return null
    }
    return (
      <ul>
        {courses.map(course => (
          <li>
            <Link
              to={`/course/${course.SUBJECT.toLowerCase()}/${
                course.CATALOG_NBR.trim().toLowerCase
              }`}
            >
              {course.SUBJECT} {course.CATALOG_NBR}: {course.COURSE_TITLE_LONG}
            </Link>
          </li>
        ))}
      </ul>
    )
  }
}

export default BlockGe
