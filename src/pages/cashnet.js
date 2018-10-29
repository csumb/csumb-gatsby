import React from 'react'
import User from 'components/user'
import Layout from 'components/layouts/default'

const Cashnet = props => {
  return (
    <Layout>
      <User>
        {user => (
          <>
            {user &&
              user !== 'anonymous' && (
                <>
                  <p>Redirecting you to CashNet...</p>
                  <div style={{ display: none }}>
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
    </Layout>
  )
}

export default Cashnet
