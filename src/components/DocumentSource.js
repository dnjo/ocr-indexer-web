import React, { Component } from 'react';
import { LoadingSpinner } from "./LoadingSpinner";

class DocumentSource extends Component {
  constructor(props) {
    super(props);

    this.state = {
      match: props.match,
      imageUrl: {},
      loading: true
    };

    this.disableLoadingState = this.disableLoadingState.bind(this);
  }

  disableLoadingState() {
    this.setState({ loading: false });
  }

  render() {
    return (
      <LoadingSpinner loading={this.state.loading}>
        <div>
          <img src={`${process.env.REACT_APP_BACKEND_BASE_URL}/images/${this.state.match.params.id}/blob`}
               alt="new"
               onLoad={this.disableLoadingState}
               onError={this.disableLoadingState} />
        </div>
      </LoadingSpinner>
    )
  }
}

export default DocumentSource;
