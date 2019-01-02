import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Amplify, { Auth }  from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: 'eu-west-1',
    userPoolId: 'eu-west-1_dFwgp2TaX',
    userPoolWebClientId: '44cu44o48ekcf6pbc6n8ka9c61',
    mandatorySignIn: true,
    oauth: {
      // Domain name
      domain : 'docr.auth.eu-west-1.amazoncognito.com',

      // Authorized scopes
      scope : ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],

      // Callback URL
      redirectSignIn : process.env.REACT_APP_BASE_URL,

      // Sign out URL
      redirectSignOut : process.env.REACT_APP_BASE_URL,

      // 'code' for Authorization code grant,
      // 'token' for Implicit grant
      responseType: 'token',

      // optional, for Cognito hosted ui specified options
      options: {
        // Indicates if the data collection is enabled to support Cognito advanced security features. By default, this flag is set to true.
        AdvancedSecurityDataCollectionFlag : true
      }
    }
  },
  API: {
    endpoints: [
      {
        name: "Backend",
        endpoint: process.env.REACT_APP_BACKEND_BASE_URL,
        custom_header: async () => {
          return {
            Authorization: (await Auth.currentSession()).idToken.jwtToken
          }
        }
      }
    ]
  }
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
