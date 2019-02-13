import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/header/site-header'
import PageTitle from 'components/header/page-title'
import { LeadParagraph } from 'components/type'
import SiteNavigation from 'components/navigation/site'
import NewsContainer from 'components/news-container'
import { NewsByline, NewsTags } from 'components/pages/news'
import RichText from 'components/rich-text'
class NewsStoryPage extends React.Component {
  render() {
    const { story, navigation } = this.props.pageContext

    return (
      <Layout pageTitle={story.title}>
        <SiteHeader path="/news">News</SiteHeader>
        {navigation && <SiteNavigation navigation={navigation} />}

        <NewsContainer>
          <PageTitle>{story.title}</PageTitle>
          <NewsTags tags={story.tags} />
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
        <RichText
          richText={JSON.parse(
            story.childContentfulNewsStoryMainContentRichTextNode.mainContent
          )}
        />
      </Layout>
    )
  }
}

export default NewsStoryPage
