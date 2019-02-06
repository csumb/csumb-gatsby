import styled from 'react-emotion'
import Calendar from 'react-calendar'
import { colors } from 'components/styles/theme'

const StyledCalendar = styled(Calendar)`
  font-size: 0.7rem;
  background: ${colors.primary.lightest};
  border: 0;
  .react-calendar__month-view__days__day--weekend {
    color: ${colors.black};
  }
  .react-calendar__navigation__label {
    font-weight: bold;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: ${colors.primary.darkest};
    color: ${colors.white};
  }
  abbr {
    border-bottom: 0;
    cursor: pointer;
  }
`

export default StyledCalendar
