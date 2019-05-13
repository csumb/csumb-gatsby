import React from 'react'

const userRoles = {
  student_applicant: 'Applicant',
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

const UserContext = React.createContext()

const setUserRole = user => {
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
  user._isEmployee = user._isStaff || user._isFaculty ? true : false
  return user
}

export { UserContext, setUserRole }
