import React from 'react'
import { UserContext } from 'components/contexts/user'

const Cashnet = props => {
  return (
    <UserContext.Consumer>
      {context => (
        <>
          {context.user &&
            context.user !== 'anonymous' && (
              <>
                <h1>One sec, we're redirecting you to CashNet...</h1>
                <div style={{ display: 'none' }}>
                  {
                    (window.location = `https://api.csumb.edu/cashnet/${
                      context.user.profile.employeeNumber
                    }/RMBRD`)
                  }
                </div>
              </>
            )}
        </>
      )}
    </UserContext.Consumer>
  )
}

export default Cashnet
