import styles from "./SubmitButton.module.css";

const SubmitButton = ({ children, disabled }) => {
  return (
    <button
      className={disabled ? styles.disabledButton : styles.submitButton}
      type="submit"
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
