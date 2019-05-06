import React, { Component } from 'react'
import { UserContext } from 'components/contexts/user'

class Olark extends Component {
  state = {
    olarkDidLoad: false,
  }

  componentDidMount() {
    if (typeof window === 'undefined' || typeof window.olark !== 'undefined') {
      return
    }
    const script = document.createElement('script')
    script.setAttribute('id', 'olark-react-snippet')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('async', true)
    script.innerHTML = `
    ;(function(o,l,a,r,k,y){if(o.olark)return; r="script";y=l.createElement(r);r=l.getElementsByTagName(r)[0]; y.async=1;y.src="//"+a;r.parentNode.insertBefore(y,r); y=o.olark=function(){k.s.push(arguments);k.t.push(+new Date)}; y.extend=function(i,j){y("extend",i,j)}; y.identify=function(i){y("identify",k.i=i)}; y.configure=function(i,j){y("configure",i,j);k.c[i]=j}; k=y._={s:[],t:[+new Date],c:{},l:a}; })(window,document,"static.olark.com/jsclient/loader.js");

    olark.identify('1001-610-10-3640');
      `
    document.body.appendChild(script)
    this.setState({
      olarkDidLoad: true,
    })
  }

  setUser(user) {
    if (
      user.anonymous ||
      typeof window === 'undefined' ||
      typeof window.olark === 'undefined'
    ) {
      return
    }
    window.olark('api.visitor.updateEmailAddress', {
      emailAddress: user.profile.email,
    })
    window.olark('api.visitor.updateFullName', {
      fullName: `${user.profile.firstName} ${user.profile.lastName}`,
    })
  }

  render() {
    if (!this.state.olarkDidLoad) {
      return null
    }
    return (
      <UserContext.Consumer>
        {context => <>{context.user && this.setUser(context.user)}</>}
      </UserContext.Consumer>
    )
  }
}

export default Olark
