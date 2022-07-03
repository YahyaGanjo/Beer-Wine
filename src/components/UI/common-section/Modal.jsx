/*import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import '../../../styles/modal.css';

const Backdrop = (props) => {
  return <div className='backdrop'></div>;
};
const ModalOverlay = (props) => {
  return (
    <div className='modal'>
      <div className='content'>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;*/

import React from 'react';
import reactDom from 'react-dom';
import '../../../styles/modal.css';

export const Backdrop = (props) => {
  return <div onClick={props.onClose} className='backdrop'></div>;
};
export const ModalOverlay = (props) => {
  return (
    <div className='dialog'>
      <div className='content'>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {reactDom.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById('overlays')
      )}
      {reactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById('overlays')
      )}
    </React.Fragment>
  );
};

export default Modal;
