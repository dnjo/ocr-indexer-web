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
  Button, Jumbotron
} from 'reactstrap';
import {ReactiveBase} from '@appbaseio/reactivesearch';
import {Route, BrowserRouter as Router, Link} from "react-router-dom";
import {Auth, Hub} from 'aws-amplify';
import Search from "./components/Search";
import UpdateDocument from "./components/UpdateDocument";
import CreateDocument from "./components/CreateDocument";
import DocumentSource from "./components/DocumentSource";
import OAuthButton from "./components/OAuthButton";

const LoggedIn = () => {
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

const LoggedOut = () => {
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
    Auth.currentAuthenticatedUser().then(user => {
      this.setState({authState: 'signedIn'});
    }).catch(e => {
      this.setState({authState: 'signIn'});
    });
  }

  onHubCapsule(capsule) {
    // The Auth module will emit events when user signs in, signs out, etc
    const { channel, payload } = capsule;
    if (channel === 'auth') {
      switch (payload.event) {
        case 'signIn':
          this.setState({authState: 'signedIn'});
          break;
        case 'signIn_failure':
          this.setState({authState: 'signIn'});
          break;
        default:
          break;
      }
    }
  }

  signOut() {
    Auth.signOut().then(() => {
      this.setState({authState: 'signIn'});
    }).catch(e => {
      console.log(e);
    });
  }

  render() {
    if (this.state.authState === 'loading') {
      return null;
    }
    return (
      <div>
        <ReactiveBase
          app="results"
          url={process.env.REACT_APP_BACKEND_BASE_URL + '/search'}>
          <Router>
            <div>
              <Navbar color="inverse" light expand="md">
                <Link to="/" className="navbar-brand">Docr</Link>
                { this.state.authState === 'signedIn' && <Link to="/document"><Button>Create new</Button></Link> }
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    { this.state.authState === 'signedIn' && <NavItem><NavLink onClick={this.signOut} href="">Log out</NavLink></NavItem> }
                    <NavItem>
                      <NavLink href="https://github.com/dnjo/ocr-indexer-web">Github</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
              { this.state.authState === 'signedIn' ? <LoggedIn/> : <LoggedOut/>}
            </div>
          </Router>
        </ReactiveBase>
      </div>
    );
  }
}

export default App;