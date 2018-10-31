import React from 'react'
import PropTypes from 'prop-types'

const userRoles = {
  student_applicant: 'Student',
  student_matriculated: 'Student',
  student_graduate: 'Student',
  student_continuing_education: 'Student',
  csumb_aa_life_member: 'Alumni',
  employee_staff: 'Staff',
  poi: 'Staff',
  employee_faculty: 'Faculty',
  corporation: 'Staff',
  employee_management: 'Staff',
  employee_temp_lecturer: 'Faculty',
  employee_executive: 'Staff',
}
class User extends React.Component {
  state = {
    user: false,
  }

  componentDidMount() {
    window
      .fetch('https://csumb.okta.com/api/v1/users/me', {
        credentials: 'include',
      })
      .then(response => {
        return response.json()
      })
      .then(user => {
        user = this.setUserRole(user)
        this.setState({
          user: user,
        })
      })
      .catch(error => {
        this.setState({
          user: 'anonymous',
        })
      })
  }

  setUserRole(user) {
    user._isStaff = false
    user._isFaculty = false
    user._isEmployee = false
    user._isStudent = false
    user._isApplicant = false
    if (typeof user.profile.cmsRole === 'undefined') {
      return user
    }
    user.profile.cmsRole.forEach(role => {
      if (typeof userRoles[role] !== 'undefined') {
        user[`_is${userRoles[role]}`] = true
      }
    })
    user._isEmployee = user._isStaff || user.isFaculty ? true : false
    return user
  }

  render() {
    const { children } = this.props
    return <>{children(this.state.user)}</>
  }
}

User.propTypes = {
  children: PropTypes.func.isRequired,
}

export default User
