import LoginForm from "../LoginFormModal/LoginForm";
import SignupForm from "../SignupFormModal/SignupForm";
import Modal from "../Modal/index";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./FormModal.module.css";

const FormModal = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const switchToLogin = (e) => {
    console.log("switched to login");
    e.preventDefault();
    setShowLogin(true);
    setShowSignup(false);
  };

  const switchToSignup = (e) => {
    console.log("switched to signup");
    e.preventDefault();
    setShowLogin(false);
    setShowSignup(true);
  };

  return (
    <div className={styles.rightNavContainer}>
      <Link onClick={() => setShowLogin(true)}>Log In</Link>
      <Link onClick={() => setShowSignup(true)}>Sign Up</Link>
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
