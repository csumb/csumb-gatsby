import React from 'react'
import { ContainerElement } from '../container-context'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Iframe = styled('iframe')`
  width: 100%;
  border: 0;
  height: 70vh;
`
class BlockCalendar extends React.Component {
  render() {
    const { format, calendar } = this.props
    return (
      <ContainerElement isFull>
        <Iframe
          src={`https://www.google.com/calendar/embed?mode=${format}&showTitle=0&showTz=0&height=460&wkst=1&bgcolor=%23ffffff&src=${calendar}&color=%23AB8B00&ctz=America%2FLos_Angeles`}
          title="Calendar"
          height="460"
        />
      </ContainerElement>
    )
  }
}

BlockCalendar.propTypes = {
  format: PropTypes.string,
  calendar: PropTypes.string.isRequired,
}

export default BlockCalendar
