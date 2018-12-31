import React, { Component } from 'react';
import Document from "./Document";
import { API } from 'aws-amplify';
import { Input } from "reactstrap";

class CreateDocument extends Component {
  constructor(props) {
    super(props);

    this.state = {
      match: props.match,
      imageFile: ''
    };

    this.createDocumentPromise = this.createDocumentPromise.bind(this);
    this.handleImageFileChange = this.handleImageFileChange.bind(this);
  }

  updateDocument(id, data, resolve, reject) {
    API.put('Backend', `/images/${id}`, { body: data })
      .then(response => resolve(response))
      .catch(reason => reject(reason));
  }

  createDocumentPromise(data) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(this.state.imageFile);
      reader.onload = () => {
        const init = {
          headers: {
            'Content-Type': 'application/json',
            'Content-Language': 'swe'
          },
          body: reader.result
        };
        API.post('Backend', '/images', init).then(response => {
          this.updateDocument(response.id, data, resolve, reject);
        }).catch(reason => {
          reject(reason);
        });
      };

      reader.onerror = (error) => {
        reject(error);
      }
    });
  }

  handleImageFileChange(event) {
    this.setState({ imageFile: event.target.files[0] });
  }

  uploadImageElement() {
    return {
      labelName: 'Image',
      elementId: 'image',
      element: (
        <Input type="file" name="file" id="image" rows="20" onChange={this.handleImageFileChange} />
      )
    }
  }

  render() {
    return (
      <>
        <Document submitPromise={this.createDocumentPromise}
                  submitButtonName="Create"
                  successMessage="Document saved."
                  errorMessage="Failed to create document."
                  formElements={[this.uploadImageElement()]} />
      </>
    )
  }
}

export default CreateDocument;
