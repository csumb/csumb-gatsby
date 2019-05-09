import React, { Component } from 'react'
import Link from 'gatsby-link'

class BlockGe extends Component {
  state = {
    courses: false,
  }

  componentDidMount() {
    const { type, code } = this.props
    fetch(`/catalog/json/${type.toLowerCase()}/${code.toLowerCase()}.json`)
      .then(response => {
        return response.json()
      })
      .then(courses => {
        this.setState({
          courses: courses,
        })
      })
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
              to={`/course/${course.SUBJECT.toLowerCase()}/${course.CATALOG_NBR.trim().toLowerCase()}`}
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
