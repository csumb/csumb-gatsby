import React, { Component } from 'react'
import { Dialog } from '../../common/dialog'
import VisuallyHidden from '../../utilities/visually-hidden'
import styled from '@emotion/styled'
import { colors } from '../../../style'
import color from 'color'

const EmergencyDialog = styled(Dialog)`
  background: ${color(colors.indicators.high)
    .lighten(0.8)
    .hex()};
  box-shadow: rgba(0, 0, 0, 0.12) 0px 20px 30px 0px;
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

class Emergency extends Component {
  state = {
    status: false,
    title: false,
    body: false,
  }
  componentDidMount() {
    fetch('https://csumb-emergency-pub.herokuapp.com/test.json')
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
