import React, { Component } from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/layouts/sections/header/site-header'
import PageTitle from 'components/layouts/sections/header/page-title'
import { LeadParagraph } from 'components/common/type'
import { SiteNavigation } from 'components/layouts/sections/navigation'
import NewsContainer from 'components/pages/news/news-container'
import { NewsByline, NewsTags } from 'components/pages/news'
import RichText from 'components/rich-text'
class NewsStoryPage extends Component {
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
        <RichText
          richText={JSON.parse(
            story.childContentfulNewsStoryMainContentRichTextNode.mainContent
          )}
        />
        <NewsContainer>
          <NewsTags tags={story.tags} />
        </NewsContainer>
      </Layout>
    )
  }
}

export default NewsStoryPage
