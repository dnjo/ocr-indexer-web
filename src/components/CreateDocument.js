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

  base64EncodeImageFile(imageFile) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      }
    });
  }

  postImage(imageBody) {
    return new Promise((resolve, reject) => {
      const init = {
        headers: {
          'Content-Type': 'application/json',
          'Content-Language': 'swe'
        },
        body: imageBody
      };
      API.post('Backend', '/images', init).then(response => {
        resolve(response.id);
      }).catch(reason => {
        reject(reason);
      });
    })
  }

  updateDocument(id, data) {
    return new Promise((resolve, reject) => {
      API.put('Backend', `/images/${id}`, { body: data })
        .then(response => resolve(response))
        .catch(reason => reject(reason));
    });
  }

  createDocumentPromise(data) {
    return this.base64EncodeImageFile(this.state.imageFile)
      .then((imageBody) => this.postImage(imageBody))
      .then((id) => this.updateDocument(id, data));
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
