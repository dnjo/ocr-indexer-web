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
import {Route, BrowserRouter as Router} from "react-router-dom";
import Search from "./Search";
import Document from "./Document";

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
      <Router>
        <div>
          <ReactiveBase
            app="results"
            url={process.env.REACT_APP_BACKEND_BASE_URL + '/search'}>
            <Navbar color="inverse" light expand="md">
              <NavbarBrand href="/">ocr-indexer</NavbarBrand>
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
                    <Route path="/document/:id" component={Document} />
                  </Col>
                </Row>
              </Container>
            </Jumbotron>
          </ReactiveBase>
        </div>
      </Router>
    );
  }
}

export default App;