import React from 'react'
import { ContainerContext, ContainerElement } from './container-context'

class BlockCalendar extends React.Component {
  render() {
    return (
      <ContainerContext.Consumer>
        {container => (
          <ContainerElement container={container}>
            <iframe
              src={`https://www.google.com/calendar/embed?mode=${
                this.props.block.data.format
              }&showTitle=0&showTz=0&height=460&wkst=1&bgcolor=%23ffffff&src=${
                this.props.block.data.calendar
              }&color=%23AB8B00&ctz=America%2FLos_Angeles`}
              title="Calendar"
              width="100%"
              height="460"
              frameborder="0"
              scrolling="no"
            />
          </ContainerElement>
        )}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockCalendar
