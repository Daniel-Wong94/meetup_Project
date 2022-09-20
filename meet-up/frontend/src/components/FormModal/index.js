import LoginForm from "../LoginFormModal/LoginForm";
import SignupForm from "../SignupFormModal/SignupForm";
import Modal from "../Modal/index";
import { useState } from "react";

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
    <>
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
    </>
  );
};

export default FormModal;
