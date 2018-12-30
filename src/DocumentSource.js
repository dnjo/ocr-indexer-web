import React, { Component } from 'react';

class DocumentSource extends Component {
  constructor(props) {
    super(props);

    this.state = {
      match: props.match,
      imageUrl: {}
    }
  }

  render() {
    return (
      <div>
        <img src={`${process.env.REACT_APP_BACKEND_BASE_URL}/images/${this.state.match.params.id}/blob`} alt="new"/>
      </div>
    )
  }
}

export default DocumentSource;
