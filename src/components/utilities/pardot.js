import { Component } from 'react'

class Pardot extends Component {
  componentDidMount() {
    if (
      typeof window === 'undefined' ||
      typeof window.__pardotLoaded !== 'undefined'
    ) {
      return
    }
    const script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('async', true)
    script.innerHTML = `
    window.__pardotLoaded=true;
    piAId = '775533';
    piCId = '37301';
    piHostname = 'pi.pardot.com';
    
    (function() {
      function async_load(){
        var s = document.createElement('script'); s.type = 'text/javascript';
        s.src = ('https:' == document.location.protocol ? 'https://pi' : 'http://cdn') + '.pardot.com/pd.js';
        var c = document.getElementsByTagName('script')[0]; c.parentNode.insertBefore(s, c);
      }
      if(window.attachEvent) { window.attachEvent('onload', async_load); }
      else { window.addEventListener('load', async_load, false); }
    })();`
    document.body.appendChild(script)
  }

  render() {
    return null
  }
}

export default Pardot
