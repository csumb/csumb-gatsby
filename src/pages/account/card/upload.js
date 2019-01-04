import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/site-header'
import Container from 'components/container'
import PageTitle from 'components/page-title'
import { AlertWarning } from 'components/alert'
import { UserContext } from 'components/contexts/user'
import { Flex, Box } from '@rebass/grid/emotion'
import samplePhoto from 'assets/images/card-sample-photo.png'
import styled from 'react-emotion'
import { Button } from 'components/button'
import ReactFilestack from 'filestack-react'

const SamplePhoto = styled('img')`
  float: right;
`

const UploadPreamble = () => (
  <Flex flexWrap="wrap">
    <Box width={[1, 2 / 3, 2 / 3]} px={2}>
      <p>
        You can take a photo with your device or upload a
        file of a headshot. You will be able to crop and
        reposition your photo before saving it. A few
        things to keep in mind:
                            </p>
      <ul>
        <li>Think drivers license or passport photo.</li>
        <li>
          Your eyes and face should be clearly visible.
                              </li>
        <li>The background should be solid.</li>
        <li>
          You should be the only person in the picture.
                              </li>
        <li>
          Your entire face/head is visible in the photo.
                              </li>
        <li>No filters.</li>
      </ul>
    </Box>
    <Box width={[1, 1 / 3, 1 / 3]} px={2}>
      <SamplePhoto src={samplePhoto} alt="Sample photo" />
    </Box>
  </Flex>
)

class OtterCardPage extends React.Component {
  state = {
    photo: false,
    showUpload: false
  }

  handleShowUpload(event) {
    event.preventDefault()
  }

  render() {
    const { photo, showUpload } = this.state
    return (
      <Layout pageTitle="OtterCard">
        <UserContext.Consumer>
          {context => (
            <>
              {context.user && (
                <>
                  <SiteHeader path="/ottercard">OtterCard</SiteHeader>
                  <Container>
                    <PageTitle>Upload your photo for your Otter Card</PageTitle>
                    <>
                      {context.user && !context.user.anonymous ? (
                        <>
                          {showUpload ? (
                            <>

                            </>
                          ) : (
                              <>
                                <UploadPreamble />
                                <ReactFilestack
                                  apikey="A3ttdsdUR8aGvjvUnJBWUz"
                                  onSuccess={this.savePhoto}
                                  options={{
                                    accept: 'image/*',
                                    maxFiles: 1,
                                    storeTo: {
                                      location: 's3',
                                    },
                                  }}
                                  render={({ onPick }) => (
                                    <div>
                                      <Button onClick={onPick}>Select or take photo</Button>
                                    </div>
                                  )}
                                />

                              </>
                            )}
                        </>
                      ) : (
                          <AlertWarning>
                            You must be logged in to upload an OtterCard photo.
                        </AlertWarning>
                        )}
                    </>
                  </Container>
                </>
              )}
            </>
          )}
        </UserContext.Consumer>
      </Layout>
    )
  }
}

export default OtterCardPage
