//import { graphql } from 'gatsby'
const courseFilter = /[A-Z]{2,} [0-9]{2,}(\/?)([A-Z]?)/g

const filterCourses = (text) => {
  const matches = text.match(courseFilter)
  if(!matches || !matches.length) {
    return text
  }
  matches.forEach(courseMatch => {
    let course = courseMatch.split(' ')
    text = text.replace(courseMatch, `<a href="/course/${course[0].toLowerCase()}/${course[1].toLowerCase()}">${courseMatch}</a>`)
  })
  return text
}

export default filterCourses