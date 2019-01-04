import React from 'react';

const LoadingSpinner = (props) => {
  return (
    <>
      <div className={props.loading ? 'd-flex justify-content-center h-100' : 'd-none'}>
        <div className="d-inline-flex align-self-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
      <div style={ props.loading ? { visibility: 'hidden' } : {} }>{props.children}</div>
    </>
  )
};

export default LoadingSpinner;
