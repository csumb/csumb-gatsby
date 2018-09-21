import React from 'react'
import Layout from '../components/layouts/default'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'
import OktaSignIn from '@okta/okta-signin-widget'

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.widget = new OktaSignIn({
        baseUrl: this.props.data.site.siteMetadata.okta.domain,
        clientId: this.props.data.site.siteMetadata.okta.clientId,
        redirectUri: 'http://localhost:8000',
        authParams: {
            responseType: 'id_token'
        }
    });
  }

  componentDidMount(){
    this.widget.renderEl({el:this.loginContainer},
      (response) => {
        this.setState({user: response.claims.email});
      },
      (err) => {
        console.log(err);
      }
    );
  }

  render(){
    return(
     <div ref={(div) => {this.loginContainer = div; }} />
    );
  }
}

export default LoginPage;

export const query = graphql`
{
    site {
      siteMetadata {
        okta {
          clientId
          domain
        }
      }
    }
  }
`