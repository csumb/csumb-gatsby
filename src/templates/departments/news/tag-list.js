import React from 'react'
import Layout from 'components/layouts/default'
import SiteHeader from 'components/layouts/sections/header/site-header'
import PageTitle from 'components/layouts/sections/header/page-title'
import SiteNavigation from 'components/layouts/sections/navigation/site'
import Container from 'components/common/container'
import { NewsList, NewsListItem } from 'components/pages/news/list'

class TagListPage extends React.Component {
  render() {
    const { tag, stories, navigation } = this.props.pageContext

    return (
      <Layout pageTitle={tag.name}>
        <SiteHeader path="/news">News</SiteHeader>
        {navigation && <SiteNavigation navigation={navigation} />}

        <Container>
          <PageTitle>{tag.name}</PageTitle>
          <NewsList>
            {stories.map(story => (
              <NewsListItem {...story} />
            ))}
          </NewsList>
        </Container>
      </Layout>
    )
  }
}

export default TagListPage
