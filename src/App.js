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
  Jumbotron, Button
} from 'reactstrap';
import {ReactiveBase} from '@appbaseio/reactivesearch';
import {Route, BrowserRouter as Router, Link} from "react-router-dom";
import Search from "./components/Search";
import UpdateDocument from "./components/UpdateDocument";
import CreateDocument from "./components/CreateDocument";
import DocumentSource from "./components/DocumentSource";

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <ReactiveBase
          app="results"
          url={process.env.REACT_APP_BACKEND_BASE_URL + '/search'}>
          <Router>
            <div>
              <Navbar color="inverse" light expand="md">
                <Link to="/" className="navbar-brand">Docr</Link>
                <Link to="/document"><Button>Create new</Button></Link>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink href="https://github.com/dnjo/ocr-indexer-web">Github</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
              <Jumbotron>
                <Container>
                  <Row>
                    <Col>
                      <Route path="/" exact component={Search} />
                      <Route path="/document" exact component={CreateDocument} />
                      <Route path="/document/:id" exact component={UpdateDocument} />
                      <Route path="/document/:id/source" exact component={DocumentSource} />
                    </Col>
                  </Row>
                </Container>
              </Jumbotron>
            </div>
          </Router>
        </ReactiveBase>
      </div>
    );
  }
}

export default App;