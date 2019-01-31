import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/header/site-header'
import Container from 'components/container'
import PageTitle from 'components/header/page-title'
import { AlertWarning, AlertSuccess } from 'components/alert'
import { UserContext } from 'components/contexts/user'
import { Flex, Box } from '@rebass/grid'
import samplePhoto from 'assets/images/card-sample-photo.png'
import styled from 'styled-components'
import { Button } from 'components/button'
import ReactFilestack, { client } from 'filestack-react'

const SamplePhoto = styled('img')`
  float: right;
`

const PhotoRules = () => (
  <ul>
    <li>Think drivers license or passport photo.</li>
    <li>Your eyes and face should be clearly visible.</li>
    <li>The background should be solid.</li>
    <li>You should be the only person in the picture.</li>
    <li>Your entire face/head is visible in the photo.</li>
    <li>No filters.</li>
  </ul>
)

const UploadPreamble = () => (
  <Flex flexWrap="wrap">
    <Box width={[1, 2 / 3, 2 / 3]} px={2}>
      <p>
        You can take a photo with your device or upload a file of a headshot.
        You will be able to crop and reposition your photo before saving it. A
        few things to keep in mind:
      </p>
      <PhotoRules />
    </Box>
    <Box width={[1, 1 / 3, 1 / 3]} px={2}>
      <SamplePhoto src={samplePhoto} alt="Sample photo" />
    </Box>
  </Flex>
)

const UploadCheck = ({ photo }) => (
  <Flex flexWrap="wrap">
    <Box width={[1, 2 / 3, 2 / 3]} px={2}>
      <p>
        This is how your picture will look on your OtterCard. Click confirm to
        send your picture off to be printed. Please check that:
      </p>
      <PhotoRules />
      <p>
        I understand that if my photo does not meet these requirements, my CSUMB
        student ID card may be delayed, and I may be charged a processing fee.
      </p>
    </Box>
    <Box width={[1, 1 / 3, 1 / 3]} px={2}>
      <SamplePhoto src={photo.url} alt="Sample photo" />
    </Box>
  </Flex>
)

class OtterCardPage extends React.Component {
  state = {
    photo: false,
    showUpload: false,
    filePickerImage: false,
    done: false,
  }

  handleShowUpload(event) {
    event.preventDefault()
  }

  handleUploadedPhoto(event) {
    console.log(event)
    this.setState({
      photo: true,
      showUpload: true,
      filePickerImage: event.filesUploaded[0],
    })
  }

  handleApprovedPhoto(user, image) {
    const login = user.profile.login.split('@').shift()
    client.storeUrl(image.url, {
      filename: `${login}.jpg`,
      path: `/${login}.jpg`,
      location: 'dropbox',
    })
  }

  render() {
    const { filePickerImage, showUpload, done } = this.state
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
                          {done ? (
                            <AlertSuccess>
                              Your photo has been received. We'll send you an
                              email within a few days to confirm your card is
                              ready.
                            </AlertSuccess>
                          ) : (
                            <>
                              {showUpload ? (
                                <>
                                  <UploadCheck
                                    photo={this.state.filePickerImage}
                                  />
                                  <Button
                                    onClick={event => {
                                      event.preventDefault()
                                      this.handleApprovedPhoto(
                                        context.user,
                                        filePickerImage
                                      )
                                      this.setState({
                                        done: true,
                                      })
                                    }}
                                  >
                                    Looks good!
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <UploadPreamble />
                                  <ReactFilestack
                                    apikey="A3ttdsdUR8aGvjvUnJBWUz"
                                    onSuccess={this.handleUploadedPhoto.bind(
                                      this
                                    )}
                                    options={{
                                      accept: 'image/*',
                                      maxFiles: 1,
                                    }}
                                    render={({ onPick }) => (
                                      <div>
                                        <Button onClick={onPick}>
                                          Select or take photo
                                        </Button>
                                      </div>
                                    )}
                                  />
                                </>
                              )}
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
