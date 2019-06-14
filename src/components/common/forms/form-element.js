import { Component } from 'react'
import PropTypes from 'prop-types'
import idGenerator from 'react-id-generator'

class FormElement extends Component {
  constructor(props) {
    super(props)
    this.htmlId = idGenerator()
  }

  cleanProps(additional) {
    let props = Object.assign({}, this.props)
    delete props.isRequired
    delete props.hideLabel
    delete props.forwardedRef
    if (typeof additional !== 'undefined') {
      additional.forEach(prop => {
        delete props[prop]
      })
    }
    return props
  }
}

FormElement.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  isRequired: PropTypes.bool,
  hideLabel: PropTypes.bool,
  forwardedRef: PropTypes.func,
}

export default FormElement
