import { Component } from 'react'

class SiteImprove extends Component {
  componentDidMount() {
    if (
      typeof window === 'undefined' ||
      typeof window.__siteimproveLoaded !== 'undefined'
    ) {
      return
    }
    window.__siteimproveLoaded = true
    const script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('async', true)
    script.innerHTML = `
    window.__siteimproveLoaded=true;
    
    /*<![CDATA[*/
        (function() {
        var sz = document.createElement('script'); sz.type = 'text/javascript'; sz.async = true;
        sz.src = '//siteimproveanalytics.com/js/siteanalyze_40230.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(sz, s);
        })();
        /*]]>*/
        `
    document.body.appendChild(script)
  }

  render() {
    return null
  }
}

export default SiteImprove
