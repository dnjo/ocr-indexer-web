import React from 'react';

const SpinnerContainer = (props) => {
  return (
    <div className={props.className || 'd-flex justify-content-center h-100'}>
      <div className="d-inline-flex align-self-center">
        <div className="spinner-border" style={{ width: '3em', height: '3em' }} role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  )
};

const LoadingSpinner = (props) => {
  return (
    <>
      <SpinnerContainer className={props.loading ? null : 'd-none'}/>
      <div style={ props.loading ? { visibility: 'hidden' } : {} }>{props.children}</div>
    </>
  )
};

export {
  SpinnerContainer,
  LoadingSpinner
}
