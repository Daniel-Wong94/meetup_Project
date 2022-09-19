import { useModal } from "../../context/Modal";
import * as ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const Modal = ({ onClose, children }) => {
  const modalNode = useModal();

  const handleClose = () => (modalNode ? onClose() : null);

  return ReactDOM.createPortal(
    <div id={styles.modal}>
      <div id={styles.modalBackground} onClick={handleClose}></div>
      <div id={styles.modalContent}>{children}</div>
    </div>,
    modalNode
  );
};

export default Modal;
