import React from 'react'
import Calendar from 'components/calendar'
import { navigate } from 'gatsby'
import moment from 'moment'
import { UnstyledList } from 'components/type'
import Well from 'components/common/well'
import styled from '@emotion/styled'
import Link from 'gatsby-link'

const EventCategories = styled(Well)`
  margin-top: 2rem;
`

class EventsSidebar extends React.Component {
  state = {
    highlightedDays: [],
  }

  componentDidMount() {
    this.handleMonthChange({
      activeStartDate: moment().format('YYYY-MM-DD'),
    })
  }

  handleMonthChange(event) {
    const currentMonth = moment(event.activeStartDate)
    fetch(`/events/json/${currentMonth.format('YYYY/M')}.json`)
      .then(response => {
        return response.json()
      })
      .then(days => {
        this.setState({
          highlightedDays: days,
        })
      })
      .catch(() => {
        this.setState({
          highlightedDays: [],
        })
      })
  }

  render() {
    const { highlightedDays } = this.state
    const { categories } = this.props
    return (
      <>
        <Calendar
          next2Label={null}
          prev2Label={null}
          tileDisabled={({ date }) => {
            const day = moment(date).format('D')
            return highlightedDays.indexOf(day) === -1
          }}
          onActiveDateChange={this.handleMonthChange.bind(this)}
          onClickDay={event => {
            navigate(
              `/events/${event.getFullYear()}/${event.getMonth() +
                1}/${event.getDate()}`
            )
          }}
        />
        <EventCategories>
          <h4>Categories</h4>
          <UnstyledList>
            {categories.map(category => (
              <li>
                <Link to={`/events/category/${category.slug}`}>
                  {category.name}
                </Link>
              </li>
            ))}
          </UnstyledList>
        </EventCategories>
      </>
    )
  }
}

export default EventsSidebar
