import SignupForm from "./SignupForm";
import { useState } from "react";
import Modal from "../Modal/index";
import { useModal } from "../../context/Modal";

const SignupFormModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
};

export default SignupFormModal;
