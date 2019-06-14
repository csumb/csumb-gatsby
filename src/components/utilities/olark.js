import { Component } from 'react'

class Olark extends Component {
  componentDidMount() {
    if (typeof window === 'undefined' || typeof window.olark !== 'undefined') {
      return
    }
    const { siteId } = this.props
    const script = document.createElement('script')
    script.setAttribute('id', 'olark-react-snippet')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('async', true)
    script.innerHTML = `
    ;(function(o,l,a,r,k,y){if(o.olark)return; r="script";y=l.createElement(r);r=l.getElementsByTagName(r)[0]; y.async=1;y.src="//"+a;r.parentNode.insertBefore(y,r); y=o.olark=function(){k.s.push(arguments);k.t.push(+new Date)}; y.extend=function(i,j){y("extend",i,j)}; y.identify=function(i){y("identify",k.i=i)}; y.configure=function(i,j){y("configure",i,j);k.c[i]=j}; k=y._={s:[],t:[+new Date],c:{},l:a}; })(window,document,"static.olark.com/jsclient/loader.js");
/* custom configuration goes here (www.olark.com/documentation) */
olark.identify('${siteId}');`
    document.body.appendChild(script)
  }

  render() {
    return null
  }
}

export default Olark
