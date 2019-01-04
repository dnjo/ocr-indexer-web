import React, { Component } from 'react';
import Document from "./Document";
import { API } from 'aws-amplify';
import { Button, Col, Container, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

class UpdateDocument extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ocrText: '',
      displayDeleteModal: false,
      loading: true
    };

    this.getDocumentDataPromise = this.getDocumentDataPromise.bind(this);
    this.updateDocumentPromise = this.updateDocumentPromise.bind(this);
    this.getDocumentDataPromise = this.getDocumentDataPromise.bind(this);
    this.handleDocumentOcrTextChange = this.handleDocumentOcrTextChange.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
  }

  getDocumentDataPromise() {
    return new Promise((resolve, reject) => {
      API.get('Backend', `/images/${this.props.match.params.id}`, {}).then(response => {
        this.setState({ ocrText: response.ocrText, loading: false });
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  }

  updateDocumentPromise(data) {
    data.ocrText = this.state.ocrText;
    return API.put('Backend', `/images/${this.props.match.params.id}`, { body: data });
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

  toggleDeleteModal() {
    this.setState({ displayDeleteModal: !this.state.displayDeleteModal });
  }

  handleDocumentOcrTextChange(event) {
    this.setState({ ocrText: event.target.value });
  }

  deleteDocument() {
    this.toggleDeleteModal();
    API.del('Backend', `/images/${this.props.match.params.id}`, {}).then(() => {
      setTimeout(() => this.props.history.push('/'), 1000);
    });
  }

  render() {
    return (
      <>
        <LoadingSpinner loading={this.state.loading}>
          <Modal isOpen={this.state.displayDeleteModal} centered={true}>
            <ModalHeader>Confirm document delete</ModalHeader>
            <ModalBody>Are you sure that you want to delete the document?</ModalBody>
            <ModalFooter>
              <Button onClick={this.deleteDocument} color="primary">Delete</Button>
              <Button onClick={this.toggleDeleteModal} color="secondary">Cancel</Button>
            </ModalFooter>
          </Modal>
          <Container>
            <Row className="mb-3">
              <Col className="p-0">
                <div className="float-right">
                  <Link to={`${this.props.match.url}/source`}>
                    <Button>View source document</Button>
                  </Link>
                  <Button onClick={this.toggleDeleteModal} className="ml-3" color="danger">Delete document</Button>
                </div>
              </Col>
            </Row>
          </Container>
          <Document documentUrl={this.props.match.url}
                    mountDataPromise={this.getDocumentDataPromise}
                    submitPromise={this.updateDocumentPromise}
                    submitButtonName="Update"
                    successMessage="Document saved."
                    errorMessage="Failed to save document."
                    formElements={[this.updateOcrTextElement()]} />
        </LoadingSpinner>
      </>
    )
  }
}

export default UpdateDocument;
