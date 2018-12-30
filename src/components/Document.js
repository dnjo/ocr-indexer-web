import React, { Component } from 'react';
import { API } from 'aws-amplify';
import { Link } from "react-router-dom";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";

class Document extends Component {
  constructor(props) {
    super(props);

    this.state = {
      match: props.match,
      text: '',
      ocrText: ''
    };

    this.handleDocumentTextChange = this.handleDocumentTextChange.bind(this);
    this.handleDocumentOcrTextChange = this.handleDocumentOcrTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    API.get('Backend', `/images/${this.state.match.params.id}`, {}).then(response => {
      this.setState({ text: response.text })
      this.setState({ ocrText: response.ocrText })
    });
  }

  handleDocumentTextChange(event) {
    this.setState({ text: event.target.value });
  }

  handleDocumentOcrTextChange(event) {
    this.setState({ ocrText: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const init = {
      body: {
        text: this.state.text,
        ocrText: this.state.ocrText
      }
    };
    API.put('Backend', `/images/${this.state.match.params.id}`, init).catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <Container>
          <Row className="mb-3">
            <Col className="p-0">
              <Link className="float-right" to={`${this.state.match.url}/source`}><Button>View source document</Button></Link>
            </Col>
          </Row>
        </Container>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup row>
            <Label for="documentText" sm={2}>Summary</Label>
            <Col sm={10}>
              <Input type="text" name="documentText" id="documentText" value={this.state.text || ''} onChange={this.handleDocumentTextChange} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="ocrText" sm={2}>Scanned text</Label>
            <Col sm={10}>
              <Input type="textarea" name="ocrText" id="ocrText" value={this.state.ocrText || ''} rows="20" onChange={this.handleDocumentOcrTextChange} />
            </Col>
          </FormGroup>
          <FormGroup check row>
            <Button color="primary">Save</Button>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default Document;
