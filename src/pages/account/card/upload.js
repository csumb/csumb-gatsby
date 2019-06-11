import React, { Component } from 'react'
import { Layout, PageTitle, SiteHeader } from 'components/layouts/default'
import Container from 'components/common/container'
import { AlertWarning, AlertSuccess } from 'components/common/alert'
import { UserContext } from 'components/contexts/user'
import { Flex, Box } from 'components/common/grid'
import samplePhoto from 'assets/images/card-sample-photo.png'
import styled from '@emotion/styled'
import { Button } from 'components/common/button'
import ReactFilestack, { client } from 'filestack-react'

const apiKey = process.env.GATSBY_CSUMB_FILESTACK_KEY

const SamplePhoto = styled.img`
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
  <Flex>
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
  <Flex>
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

class OtterCardPage extends Component {
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
    this.setState({
      photo: true,
      showUpload: true,
      filePickerImage: event.filesUploaded[0],
    })
  }

  handleApprovedPhoto(user, image) {
    const login = user._username
    const filestack = client.init(apiKey)

    filestack
      .storeURL(image.url, {
        filename: `${login}.jpg`,
        path: `/${login}.jpg`,
        location: ' dropbox',
      })
      .then(res => {
        this.setState({
          done: true,
        })
      })
      .catch(error => {
        this.setState({
          done: true,
        })
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
                                  <UploadCheck photo={filePickerImage} />
                                  <Button
                                    onClick={event => {
                                      event.preventDefault()
                                      this.handleApprovedPhoto(
                                        context.user,
                                        filePickerImage
                                      )
                                    }}
                                  >
                                    Looks good!
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <UploadPreamble />
                                  <ReactFilestack
                                    apikey={apiKey}
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
