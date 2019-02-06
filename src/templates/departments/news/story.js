import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/header/site-header'
import PageTitle from 'components/header/page-title'
import { LeadParagraph } from 'components/type'
import SiteNavigation from 'components/navigation/site'
import NewsContainer from 'components/news-container'
import { NewsByline, NewsContent } from 'components/pages/news'

class NewsStoryPage extends React.Component {
  render() {
    const { story, navigation } = this.props.pageContext

    return (
      <Layout pageTitle={story.title}>
        <SiteHeader path="/news">News</SiteHeader>
        {navigation && <SiteNavigation navigation={navigation} />}

        <NewsContainer>
          <PageTitle>{story.title}</PageTitle>
          <NewsByline story={story} />
          {story.childContentfulNewsStoryLeadParagraphTextNode
            .leadParagraph && (
            <LeadParagraph>
              {
                story.childContentfulNewsStoryLeadParagraphTextNode
                  .leadParagraph
              }
            </LeadParagraph>
          )}
        </NewsContainer>
        <NewsContent
          content={
            story.childContentfulNewsStoryMainContentRichTextNode
              .childContentfulRichText.html
          }
        />
      </Layout>
    )
  }
}

export default NewsStoryPage
