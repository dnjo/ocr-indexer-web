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
import {DataSearch, ReactiveBase, ResultList} from '@appbaseio/reactivesearch';

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
  static presentQuery() {
    return {
      bool: {
        must_not: {
          match: {
            present: false
          }
        }
      }
    };
  }
  render() {
    return (
      <div>
        <ReactiveBase
          app="results"
          url={process.env.REACT_APP_ES_SEARCH_URL}>
          <Navbar color="inverse" light expand="md">
            <NavbarBrand href="/">ocr-indexer</NavbarBrand>
            <DataSearch
              componentId="searchbox"
              dataField={["text", "ocrText"]}
              debounce={200}
              autosuggest={false}
            />
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
                  <ResultList
                    componentId="results"
                    dataField="createdAt"
                    react={{
                      "and": ["searchbox"]
                    }}
                    onData={(res) => {
                      return {
                        title: res.createdAt,
                        url: `/document/${res._id}`
                      }
                    }}
                    defaultQuery={App.presentQuery}
                  />
                </Col>
              </Row>
            </Container>
          </Jumbotron>
        </ReactiveBase>
      </div>
    );
  }
}

export default App;