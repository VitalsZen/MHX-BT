import React from 'react';
import './Modal.css';

function Modal({ currentTask, toggleModal }) {
  return (
    <div className="modal">
      <div onClick={toggleModal} className="overlay"></div>
      <div className="modal-content">
        <h2>Details</h2>
        <p><strong>Title:</strong> {currentTask.title}</p>
        <p><strong>Description:</strong> {currentTask.description}</p>
        <button className="close-modal" onClick={toggleModal}>
          CLOSE
        </button>
      </div>
    </div>
  );
}

export default Modal;
