import React from 'react'
import User from 'components/user'

const Cashnet = props => {
  return (
    <User>
      {user => (
        <>
          {user &&
            user !== 'anonymous' && (
              <>
                <h1>One sec, we're redirecting you to CashNet...</h1>
                <div style={{ display: 'none' }}>
                  {
                    (window.location = `https://api.csumb.edu/cashnet/${
                      user.profile.employeeNumber
                    }/RMBRD`)
                  }
                </div>
              </>
            )}
        </>
      )}
    </User>
  )
}

export default Cashnet
