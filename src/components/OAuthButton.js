import { withOAuth } from 'aws-amplify-react';
import React, { Component } from 'react';
import { Button } from "reactstrap";

class OAuthButton extends Component {
  render() {
    return (
      <Button color="primary" className={this.props.className} onClick={this.props.OAuthSignIn}>
        Click here to sign in or register
      </Button>
    )
  }
}

export default withOAuth(OAuthButton);