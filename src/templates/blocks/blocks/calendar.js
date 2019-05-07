import React, { Component } from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const Iframe = styled('iframe')`
  width: 100%;
  border: 0;
  height: 70vh;
`
class BlockCalendar extends Component {
  render() {
    const { format, calendar } = this.props
    return (
      <Iframe
        src={`https://www.google.com/calendar/embed?mode=${format}&showTitle=0&showTz=0&height=460&wkst=1&bgcolor=%23ffffff&src=${calendar}&color=%23AB8B00&ctz=America%2FLos_Angeles`}
        title="Calendar"
        height="460"
      />
    )
  }
}

BlockCalendar.propTypes = {
  format: PropTypes.string,
  calendar: PropTypes.string.isRequired,
}

export default BlockCalendar
