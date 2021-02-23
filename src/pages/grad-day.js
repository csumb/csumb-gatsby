import React from 'react'
import {
  Layout,
  SiteHeader,
  SiteNavigation,
  PageTitle,
} from '../components/layouts/default'
import { graphql } from 'gatsby'
import Container from '../components/common/container'
import IframeResizer from 'iframe-resizer-react'
import PageFeedbackContext from '../components/contexts/page-feedback'

const html = `<script>
        <!--//--><![CDATA[// ><!--

(function (d) {
    // embed.js CDN
    var cdn = window.StacklaGoConnectConfig ? window.StacklaGoConnectConfig.cdn : 'assetscdn.stackla.com';
    var t = d.createElement('script');
    t.type = 'text/javascript';
    t.src = 'https://' + cdn + '/media/js/common/plugin_goconnect_embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(t);
}(document));

//--><!]]>
    </script>`

const ScriptEl = document.createRange().createContextualFragment(html)
document.body.append(ScriptEl)

// const GradScript = document.createElement('script')
// GradScript.setAttribute('type', 'text/javascript')
// GradScript.text = `
// <!--//--><![CDATA[// ><!--

// (function (d) {
//     // embed.js CDN
//     var cdn = window.StacklaGoConnectConfig ? window.StacklaGoConnectConfig.cdn : 'assetscdn.stackla.com';
//     var t = d.createElement('script');
//     t.type = 'text/javascript';
//     t.src = 'https://' + cdn + '/media/js/common/plugin_goconnect_embed.js';
//     (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(t);
// }(document));

// //--><!]]>
// `
// target.appendChild(GradScript)

const GradDayPage = () => {
  return (
    <PageFeedbackContext.Provider
      value={{
        email: 'webfolk@csumb.edu',
        title: 'Grad Day',
        url: '/grad-day',
      }}
    >
      <Layout pageTitle="Grad Day">
        <SiteHeader path="/grad-day">Grad Day</SiteHeader>
        <SiteNavigation navigation={null} />
        <Container>
          <PageTitle>Grad Day (test)</PageTitle>
          <h2>CSUMB Grad Day</h2>
          {/* <ScriptEl /> */}
          <IframeResizer
            src={`https://goconnect.stackla.com/widget/show?plugin_id=5ea196be5374c`}
            frameBorder="0"
            style={{ width: '100%', overflow: 'hidden', height: '724.367px' }}
            sandbox="allow-top-navigation allow-same-origin allow-forms allow-popups allow-scripts"
            target="_top"
          />
          <IframeResizer
            src={`https://widget.stackla.com/widget/show/?wid=5e988b46a70c3&ct=&ttl=60&unique_id=1`}
            frameBorder="0"
            style={{ width: '100%', frameborder: 0, height: 2054.23 }}
            sandbox="allow-top-navigation allow-same-origin allow-forms allow-popups allow-scripts"
            target="_top"
          />
        </Container>
      </Layout>
    </PageFeedbackContext.Provider>
  )
}

export default GradDayPage

export const query = graphql`
  {
    allMarkdownRemark(filter: { frontmatter: { name: { eq: "grad-day" } } }) {
      edges {
        node {
          frontmatter {
            name
            title
          }
          html
        }
      }
    }
  }
`
