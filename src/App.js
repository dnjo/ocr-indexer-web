import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  Jumbotron
} from 'reactstrap';
import {ReactiveBase} from '@appbaseio/reactivesearch';
import {Route, BrowserRouter as Router, Link} from "react-router-dom";
import {Auth, Hub} from 'aws-amplify';
import Search from "./components/Search";
import UpdateDocument from "./components/UpdateDocument";
import CreateDocument from "./components/CreateDocument";
import DocumentSource from "./components/DocumentSource";
import OAuthButton from "./components/OAuthButton";

const signedInState = 'signedIn';
const signedOutState = 'signedOut';

const SignedIn = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Route path="/" exact component={Search} />
          <Route path="/document" exact component={CreateDocument} />
          <Route path="/document/:id" exact component={UpdateDocument} />
          <Route path="/document/:id/source" exact component={DocumentSource} />
        </Col>
      </Row>
    </Container>
  );
};

const SignedOut = () => {
  return (
    <div>
      <div>
        <Jumbotron>
          <Container>
            <h1 className="display-3">Docr</h1>
            <p className="lead">Welcome to Docr, a searchable document repository.</p>
            <hr className="my-2" />
            <OAuthButton className="mt-3"/>
          </Container>
        </Jumbotron>
      </div>
    </div>
  )
};

class App extends Component {
  constructor(props) {
    super(props);

    this.onHubCapsule = this.onHubCapsule.bind(this);
    this.toggle = this.toggle.bind(this);
    this.signOut = this.signOut.bind(this);
    this.setSignedIn = this.setSignedIn.bind(this);
    this.setSignedOut = this.setSignedOut.bind(this);
    Hub.listen('auth', this);

    this.state = {
      isOpen: false,
      authState: 'loading'
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentDidMount() {
    // check the current user when the App component is loaded
    Auth.currentAuthenticatedUser().then(() => {
      this.setSignedIn();
    }).catch(e => {
      this.setSignedOut();
    });
  }

  onHubCapsule(capsule) {
    // The Auth module will emit events when user signs in, signs out, etc
    const { channel, payload } = capsule;
    if (channel === 'auth') {
      switch (payload.event) {
        case 'signIn':
          this.setSignedIn();
          break;
        case 'signIn_failure':
          this.setSignedOut();
          break;
        default:
          break;
      }
    }
  }

  async setSignedIn() {
    this.setState({ authState: signedInState, authToken: (await Auth.currentSession()).idToken.jwtToken });
  }

  setSignedOut() {
    this.setState({ authState: signedOutState, authToken: null });
  }

  signOut() {
    Auth.signOut();
  }

  render() {
    if (this.state.authState === 'loading') {
      return null;
    }
    return (
      <div>
        <ReactiveBase
          app="results"
          url={process.env.REACT_APP_BACKEND_BASE_URL_NEW + '/search'}
          headers={ { Authorization: this.state.authToken } }>
          <Router>
            <div>
              <Navbar color="inverse" light expand="md">
                <Link to="/" className="navbar-brand">Docr</Link>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    { this.state.authState === signedInState && <NavItem><Link className="nav-link" to="/document">New document</Link></NavItem> }
                    { this.state.authState === signedInState && <NavItem><NavLink onClick={this.signOut} href="">Log out</NavLink></NavItem> }
                  </Nav>
                </Collapse>
              </Navbar>
              { this.state.authState === signedInState ? <SignedIn/> : <SignedOut/>}
            </div>
          </Router>
        </ReactiveBase>
      </div>
    );
  }
}

export default App;