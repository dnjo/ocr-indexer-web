import React, { Component } from 'react';
import Document from "./Document";
import { API } from 'aws-amplify';
import { Button, Col, Container, Input, Row } from "reactstrap";
import { Link } from "react-router-dom";

class UpdateDocument extends Component {
  constructor(props) {
    super(props);

    this.state = {
      match: props.match,
      ocrText: ''
    };

    this.getDocumentDataPromise = this.getDocumentDataPromise.bind(this);
    this.updateDocumentPromise = this.updateDocumentPromise.bind(this);
    this.getDocumentDataPromise = this.getDocumentDataPromise.bind(this);
    this.handleDocumentOcrTextChange = this.handleDocumentOcrTextChange.bind(this);
  }

  getDocumentDataPromise() {
    return API.get('Backend', `/images/${this.state.match.params.id}`, {}).then(response => {
      this.setState({ ocrText: response.ocrText });
      return new Promise(resolve => {
        resolve(response);
      });
    }).catch(error => {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    });
  }

  updateDocumentPromise(data) {
    data.ocrText = this.state.ocrText;
    return API.put('Backend', `/images/${this.state.match.params.id}`, { body: data });
  }

  updateOcrTextElement() {
    return {
      labelName: 'Scanned text',
      elementId: 'ocrText',
      element: (
        <Input type="textarea" name="ocrText" id="ocrText" value={this.state.ocrText || ''} rows="20" onChange={this.handleDocumentOcrTextChange} />
      )
    }
  }

  handleDocumentOcrTextChange(event) {
    this.setState({ ocrText: event.target.value });
  }

  render() {
    return (
      <>
        <Container>
          <Row className="mb-3">
            <Col className="p-0">
              <Link className="float-right" to={`${this.state.match.url}/source`}>
                <Button>View source document</Button>
              </Link>
            </Col>
          </Row>
        </Container>
        <Document documentUrl={this.state.match.url}
                  mountDataPromise={this.getDocumentDataPromise}
                  submitPromise={this.updateDocumentPromise}
                  submitButtonName="Update"
                  successMessage="Document saved."
                  errorMessage="Failed to save document."
                  formElements={[this.updateOcrTextElement()]} />
      </>
    )
  }
}

export default UpdateDocument;
