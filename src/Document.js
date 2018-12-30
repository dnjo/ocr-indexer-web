import React, { Component } from 'react';
import { API } from 'aws-amplify';
import { Link } from "react-router-dom";

class Document extends Component {
  constructor(props) {
    super(props);

    this.state = {
      match: props.match,
      document: {}
    }
  }

  componentDidMount() {
    API.get('Backend', `/images/${this.state.match.params.id}`, {}).then(response => {
      this.setState({ document: response })
    });
  }

  render() {
    return (
      <div>
        <Link to={`${this.state.match.url}/source`}>View source document</Link>
        <p>Text: {this.state.document.text}</p>
        <p>Created at: {this.state.document.createdAt}</p>
        OCR text: <pre>{this.state.document.ocrText}</pre>
      </div>
    )
  }
}

export default Document;
