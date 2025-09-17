import Modal from "react-bootstrap/Modal";
import "./AppModal.css";

const AppModal = ({ show, handleClose, title, children, size, fullscreen }) => {
  return (
    <div className="appmodal">
      <Modal show={show} onHide={handleClose} size={size ? `${size}` : ""} fullscreen={fullscreen} centered backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </div>
  );
};

export default AppModal;
