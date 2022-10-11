import styles from "./SubmitButton.module.css";

const SubmitButton = ({ children, disabled, onClick }) => {
  return (
    <button
      className={disabled ? styles.disabledButton : styles.submitButton}
      type="submit"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
