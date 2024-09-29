import React from 'react';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';

const Modal = ({ message, onClose, children }) => {
  return (
    <div>
    <BootstrapModal show={true} onHide={onClose}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>알림</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <p>{message}</p>
        {children} {/* 여기에 버튼이 렌더링됩니다. */}
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
       
      </BootstrapModal.Footer>
    </BootstrapModal>
    </div>
  );
};

export default Modal;