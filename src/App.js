import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  Jumbotron} from 'reactstrap';
import {ReactiveBase} from '@appbaseio/reactivesearch';
import {Route, BrowserRouter as Router, Link} from "react-router-dom";
import Search from "./components/Search";
import Document from "./components/Document";
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
                <Link to="/"><NavbarBrand>ocr-indexer</NavbarBrand></Link>
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
                      <Route path="/document/:id" exact component={Document} />
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