import LoginForm from "../LoginFormModal/LoginForm";
import SignupForm from "../SignupFormModal/SignupForm";
import Modal from "../Modal/index";
import { useState } from "react";
import styles from "./FormModal.module.css";

const FormModal = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const switchToLogin = (e) => {
    e.preventDefault();
    setShowLogin(true);
    setShowSignup(false);
  };

  const switchToSignup = (e) => {
    e.preventDefault();
    setShowLogin(false);
    setShowSignup(true);
  };

  return (
    <div className={styles.rightNavContainer}>
      <button onClick={() => setShowLogin(true)}>Log In</button>
      <button onClick={() => setShowSignup(true)}>Sign Up</button>
      {showLogin && (
        <Modal onClose={() => setShowLogin(false)}>
          <LoginForm switchToSignup={switchToSignup} />
        </Modal>
      )}
      {showSignup && (
        <Modal onClose={() => setShowSignup(false)}>
          <SignupForm switchToLogin={switchToLogin} />
        </Modal>
      )}
    </div>
  );
};

export default FormModal;
