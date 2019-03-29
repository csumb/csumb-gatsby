import React from 'react'
import Well from 'components/well'
import Link from 'gatsby-link'

class BlockCourses extends React.Component {
  state = {
    courses: false,
  }

  componentDidMount() {
    const { level, subjectCode } = this.props
    fetch(`/catalog/json/subject/${subjectCode.toLowerCase()}.json`)
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
      <>
        {courses.map(course => (
          <Well>
            <h3>
              <Link
                to={`/course/${course.SUBJECT.toLowerCase()}/${
                  course.CATALOG_NBR.trim().toLowerCase
                }`}
              >
                {course.SUBJECT} {course.CATALOG_NBR}:{' '}
                {course.COURSE_TITLE_LONG}
              </Link>
            </h3>
            <p>{course.DESCRLONG}</p>
          </Well>
        ))}
      </>
    )
  }
}

export default BlockCourses
