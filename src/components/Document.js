import React, { Component } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, UncontrolledAlert } from "reactstrap";
import PropTypes from 'prop-types';

class Document extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      saveSuccess: false,
      saveError: false
    };

    this.handleDocumentTextChange = this.handleDocumentTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearSaveAlert = this.clearSaveAlert.bind(this);
  }

  componentDidMount() {
    if (!this.props.mountDataPromise) {
      return;
    }
    this.props.mountDataPromise().then(response => {
      this.setState({ text: response.text });
    });
  }

  handleDocumentTextChange(event) {
    this.setState({ text: event.target.value });
  }

  clearSaveAlert() {
    this.setState( { saveSuccess: false, saveError: false });
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      text: this.state.text
    };
    this.props.submitPromise(data).then(() => {
      this.setState({ saveSuccess: true });
    }).catch(() => {
      this.setState({ saveError: true });
    });
  }

  render() {
    return (
      <>
        <UncontrolledAlert color="success" isOpen={this.state.saveSuccess} toggle={this.clearSaveAlert}>{this.props.successMessage}</UncontrolledAlert>
        <UncontrolledAlert color="danger" isOpen={this.state.saveError} toggle={this.clearSaveAlert}>{this.props.errorMessage}</UncontrolledAlert>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup row>
            <Label for="documentText" sm={2}>Summary</Label>
            <Col sm={10}>
              <Input type="text" name="documentText" id="documentText" value={this.state.text || ''} onChange={this.handleDocumentTextChange} />
            </Col>
          </FormGroup>
          {this.props.formElements.map(element =>
            <FormGroup key={element.elementId} row>
              <Label for={element.elementId} sm={2}>{element.labelName}</Label>
              <Col sm={10}>
                {element.element}
              </Col>
            </FormGroup>
          )}
          <FormGroup check row>
            <Button  color="primary">{this.props.submitButtonName}</Button>
          </FormGroup>
        </Form>
      </>
    )
  }
}

Document.propTypes = {
        mountDataPromise: PropTypes.func,
        submitPromise: PropTypes.func.isRequired,
        submitButtonName: PropTypes.string.isRequired,
        successMessage: PropTypes.string.isRequired,
        errorMessage: PropTypes.string.isRequired,
        formElements: PropTypes.array
};

export default Document;
