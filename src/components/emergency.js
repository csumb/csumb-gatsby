import React from 'react'
import { Dialog } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import styled from 'react-emotion'
import '@reach/dialog/styles.css'
import { colors } from 'components/styles/theme'
import color from 'color'

const EmergencyDialog = styled(Dialog)`
  background: ${color(colors.indicators.high)
    .lighten(0.8)
    .hex()};
`

const EmergencyDialogClose = styled('button')`
  float: right;
  color: ${colors.black};
  font-size: 1.5rem;
  line-height: 1rem;
  font-weight: bold;
  background: transparent;
  border: 0;
  cursor: pointer;
`

class Emergency extends React.Component {
  state = {
    status: false,
    title: false,
    body: false,
  }
  componentDidMount() {
    fetch('https://csumb-emergency-pub.herokuapp.com/emergency.json')
      .then(response => {
        return response.json()
      })
      .then(emergency => {
        if (emergency && emergency.status) {
          this.setState({
            status: emergency.status,
            title: emergency.title,
            body: emergency.body,
          })
        }
      })
      .catch(error => {})
  }

  render() {
    const { status, title, body } = this.state
    return (
      <>
        {status && (
          <EmergencyDialog isOpen={true}>
            <EmergencyDialogClose
              className="close-button"
              onClick={() => this.setState({ status: false })}
            >
              <VisuallyHidden>Close</VisuallyHidden>
              <span aria-hidden>×</span>
            </EmergencyDialogClose>
            <h3>{title}</h3>
            <p>{body}</p>
          </EmergencyDialog>
        )}
      </>
    )
  }
}

export default Emergency
